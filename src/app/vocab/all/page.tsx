import { fetchAllWords } from "../actions";
import { Card, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { getViewColor } from "@/utils/tailwind";

export default async function AllWords() {
  const allWords = await fetchAllWords();

  if ("error" in allWords) {
    return <p className="text-red-500">{allWords.error}</p>;
  } else if (allWords.length === 0) {
    return (
      <div className="flex flex-col items-center py-5">
        <p>No Words Available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-10">
      <ul className="max-w-[90%] flex flex-wrap gap-2">
        {allWords.map(
          (
            { wordId, views }: { wordId: string; views: number },
            index: number
          ) => (
            <li key={wordId + "_" + index} className="min-w-40">
              <Link
                href={`/vocab/view/${wordId}`}
                className="text-lg font-semibold"
              >
                <Card className="flex justify-between p-2 rounded-lg gap-2">
                  <CardTitle className="text-xl font-normal">
                    {wordId}
                  </CardTitle>
                  <div
                    className={`px-2 flex items-center justify-center rounded-lg ${getViewColor(
                      views
                    )}`}
                    aria-label="view count"
                  >
                    {views}
                  </div>
                </Card>
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
