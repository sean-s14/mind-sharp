"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function addWord(prevState: any, formData: FormData) {
  const session = await auth();

  const wordSchema = z.object({
    id: z.string(),
    uuid: z.string(),
  });

  const wordParse = wordSchema.safeParse({
    id: formData.get("id"),
    uuid: formData.get("uuid"),
  });

  if (!wordParse.success) {
    console.error(wordParse.error);
    const formatted = wordParse.error.format();
    /* {
      id: { _errors: [ 'Expected string, received number' ] }
    } */
    return formatted;
  }

  const wordData = wordParse.data;

  try {
    await prisma.word.create({
      data: {
        id: wordData.id,
        uuid: wordData.uuid,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code !== "P2002") {
        if (process.env.NODE_ENV === "development") console.error(e);
        return { message: "Failed to add word" };
      }
    }
  }

  const userWordMetaSchema = z.object({
    userId: z.string(),
    wordId: z.string(),
  });

  const userWordMetaParse = userWordMetaSchema.safeParse({
    userId: session?.user?.id,
    wordId: formData.get("id"),
  });

  if (!userWordMetaParse.success) {
    console.error(userWordMetaParse.error);
    const formatted = userWordMetaParse.error.format();
    return formatted;
  }

  const userWordMetaData = userWordMetaParse.data;

  try {
    await prisma.userWordMeta.create({
      data: {
        userId: userWordMetaData.userId,
        wordId: userWordMetaData.wordId,
      },
    });

    revalidatePath("/vocab/all");
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.error("Attempt to add already existing user to word relation");
        return {
          message: `Word "${wordData.id.split(":")[0]}" has already been added`,
        };
      } else {
        return { message: "Failed to make many-to-many connection" };
      }
    }
  }

  return { message: "success" };
}

export async function getDailyWord() {
  const today = new Date();
  const start = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const end = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  const session = await auth();
  if (!session?.user?.id)
    return { error: "You must have an account to view your daily word" };

  try {
    const dailyWordMeta = await prisma.userWordMeta.findFirstOrThrow({
      where: {
        userId: session?.user?.id,
        daily: {
          gte: start,
          lt: end,
        },
      },
    });

    const dailyWord = await prisma.word.findUniqueOrThrow({
      where: {
        id: dailyWordMeta.wordId,
      },
    });

    return dailyWord;
  } catch (e) {
    try {
      const userWordMeta = await prisma.userWordMeta.findFirstOrThrow({
        where: {
          userId: session?.user?.id,
        },
        orderBy: {
          views: "asc", // Order by views in ascending order (lowest to highest)
        },
        take: 1, // Take the first result (the one with the lowest views)
      });

      // Update 'daily' field to todays date and increment views by 1
      await prisma.userWordMeta.update({
        where: {
          id: userWordMeta.id,
        },
        data: {
          daily: today,
          views: {
            increment: 1,
          },
        },
      });

      const dailyWord = await prisma.word.findUniqueOrThrow({
        where: {
          id: userWordMeta.wordId,
        },
      });

      return dailyWord;
    } catch (e) {
      return { error: "Add more words to vocabulary builder" };
    }
  }
}

export async function fetchAllWords() {
  const session = await auth();

  try {
    const allWords = await prisma.userWordMeta.findMany({
      where: {
        userId: session?.user?.id,
      },
    });
    return allWords;
  } catch (e) {
    if (process.env.NODE_ENV === "development") console.error(e);
    return { error: "Error retrieving vocabulary collection" };
  }
}

export async function deleteWord({ wordId }: { wordId: string }) {
  const session = await auth();

  try {
    const word = await prisma.userWordMeta.findFirstOrThrow({
      where: {
        wordId: wordId,
        userId: session?.user?.id,
      },
    });

    await prisma.userWordMeta.delete({
      where: {
        id: word.id,
      },
    });

    revalidatePath("/vocab/all");
    return { wordId, message: "success", error: "" };
  } catch (e) {
    if (process.env.NODE_ENV === "development") console.error(e);
    return {
      wordId,
      message: "",
      error: `Failed to delete word "${wordId.split(":")[0]}"`,
    };
  }
}

export async function getWordMeta(wordId: string) {
  const session = await auth();

  try {
    const word = await prisma.userWordMeta.findFirstOrThrow({
      where: {
        wordId: wordId,
        // The below field is to ensure only the user who owns this object can delete it
        userId: session?.user?.id,
      },
    });

    return word;
  } catch (e) {
    if (process.env.NODE_ENV === "development") console.error(e);
    return { error: "Unable to retrieve selected word" };
  }
}

export async function incrementViews(userWordMetaId: string) {
  const session = await auth();

  try {
    const updatedUserWordMeta = await prisma.userWordMeta.update({
      where: {
        id: userWordMetaId,
        userId: session?.user?.id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return updatedUserWordMeta;
  } catch (e) {
    return { error: "Unable to update view count" };
  }
}

export async function decrementViews(userWordMetaId: string) {
  const session = await auth();

  try {
    const updatedUserWordMeta = await prisma.userWordMeta.update({
      where: {
        id: userWordMetaId,
        userId: session?.user?.id,
      },
      data: {
        views: {
          decrement: 1,
        },
      },
    });

    return updatedUserWordMeta;
  } catch (e) {
    return { error: "Unable to update view count" };
  }
}
