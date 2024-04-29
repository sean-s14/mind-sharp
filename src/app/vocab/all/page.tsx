import { fetchAllWords } from "../actions";
import { Card, CardTitle } from "@/components/ui/card";

export default async function AllWords() {
  const allWords = await fetchAllWords();

  if ("error" in allWords) return null; // TODO: Updated this with error message or redirect

  const viewColor = (views: number) => {
    let color = "";

    if (views > 2) {
      color = " bg-cyan-400";
    } else if (views > 1) {
      color = " bg-emerald-400";
    } else if (views > 0) {
      color = " bg-amber-400";
    }

    if (views > 0) {
      color += " text-zinc-800 font-bold";
    }

    return color;
  };

  return (
    <div className="flex flex-col items-center py-10">
      <ul className="max-w-[90%] flex flex-wrap gap-2">
        {allWords.map(
          (
            { wordId, views }: { wordId: string; views: number },
            index: number
          ) => (
            <li key={wordId + "_" + index} className="min-w-40">
              <Card className="flex justify-between p-2 rounded-lg gap-2">
                <CardTitle className="text-xl font-normal">{wordId}</CardTitle>
                <div
                  className={`px-2 flex items-center justify-center bg-zinc-600 rounded-lg ${viewColor(
                    views
                  )}`}
                >
                  {views}
                </div>
              </Card>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
