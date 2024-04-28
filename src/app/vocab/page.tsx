import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDailyWord } from "@/app/vocab/actions";
import DailyWord from "@/components/vocab/daily-word";

export default async function VocabularyBuilder() {
  const dailyWord = await getDailyWord();

  if (process.env.NODE_ENV === "development") {
    console.log("Daily Word:", dailyWord);
  }

  // TODO: Update this and add toast
  if ("message" in dailyWord) return null;

  return (
    <div className="flex flex-col items-center py-4">
      <div className="flex justify-between min-w-full px-10">
        <h1 className="text-2xl mb-4">Vocabulary Builder</h1>
        <div className="flex flex-col gap-2">
          <Button className="bg-zinc-500 dark:bg-zinc-300 dark:hover:bg-zinc-100">
            <Link href="/vocab/add" className="text-lg font-semibold">
              + New word
            </Link>
          </Button>
          <Button className="dark:text-zinc-300 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500">
            <Link href="/vocab/list" className="text-lg font-semibold">
              View All Words
            </Link>
          </Button>
        </div>
      </div>
      <DailyWord wordId={dailyWord.id} />
    </div>
  );
}
