import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDailyWord } from "@/app/vocab/actions";
import Word from "@/components/vocab/word";
import { Suspense } from "react";
import WordSkeleton from "@/components/vocab/word-skeleton";

export default async function VocabularyBuilder() {
  const dailyWord = await getDailyWord();

  return (
    <div className="flex flex-col items-center py-2 xs:py-4 pb-10">
      <div className="flex justify-between min-w-full px-4 xs:px-10">
        <h1 className="text-lg xs:text-2xl mb-4">Vocabulary Builder</h1>
        <div className="flex flex-col gap-2">
          <Button className="bg-zinc-500 dark:bg-zinc-300 dark:hover:bg-zinc-100 h-8 w-32 xs:h-9 xs:w-40">
            <Link
              href="/vocab/add"
              className="text-md xs:text-lg font-semibold"
            >
              + New word
            </Link>
          </Button>
          <Button className="dark:text-zinc-300 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 h-8 w-32 xs:h-9 xs:w-40">
            <Link
              href="/vocab/all"
              className="text-md xs:text-lg font-semibold"
            >
              View All Words
            </Link>
          </Button>
        </div>
      </div>
      {"error" in dailyWord ? (
        <div>
          <p className="text-red-500">{dailyWord.error}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-4 xs:mt-0">
          <h2 className="text-lg xs:text-2xl font-normal mb-2 xs:mb-6">
            Word Of The Day
          </h2>
          <Suspense fallback={<WordSkeleton />}>
            <Word wordId={dailyWord.id} />
          </Suspense>
        </div>
      )}
    </div>
  );
}
