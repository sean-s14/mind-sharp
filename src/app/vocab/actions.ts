"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { auth } from "@/auth";

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
        console.error(e);
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
