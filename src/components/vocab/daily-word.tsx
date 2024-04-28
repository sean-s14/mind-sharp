"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchWord } from "@/api/fetchWord";
import { capitalise } from "@sean14/utils";
import { mwParser } from "@/utils/mw-parser";

export default function DailyWord({ wordId }: { wordId: string }) {
  const [word, homonym] = wordId.split(":");

  const { data, isLoading } = useQuery({
    queryKey: [wordId],
    queryFn: () => fetchWord(word),
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  });

  if (isLoading) return null; // TODO: Add loading element
  const wordData = homonym ? data[parseInt(homonym) - 1] : data[0];
  if (process.env.NODE_ENV === "development") console.log(wordData);

  return (
    <Card className="p-4 mt-4 w-[600px] max-w-[90%]">
      <CardHeader>
        <CardTitle className="text-center text-xl font-normal">
          Word Of The Day
        </CardTitle>
      </CardHeader>
      <CardContent className="text-left flex flex-col gap-6">
        {/* Word */}
        <p className="text-center text-6xl font-thin mb-8">
          {capitalise(word)}
        </p>

        {/* Etymomlogy */}
        <div>
          <h3 className="font-semibold pb-2">Etymology</h3>
          <p
            className="pl-4 text-sm"
            dangerouslySetInnerHTML={{
              __html: mwParser(wordData?.et[0][1]),
            }}
          ></p>
        </div>

        {/* Definitions + Examples */}
        <div>
          <h3 className="font-semibold pb-2">Definitions</h3>
          <div className="flex flex-col gap-3">
            {wordData?.def[0]?.sseq?.map(
              (sense_sequence: any[], index: number) => {
                if (process.env.NODE_ENV === "development") {
                  console.log("\n==========\nsense sequence");
                  console.log(sense_sequence);
                }

                return sense_sequence.map((sense: any, index: number) => {
                  if (process.env.NODE_ENV === "development") {
                    console.log("\n----------\nsense");
                    console.log(sense);
                  }

                  const definition = sense[1].dt[0][1];

                  let example = sense[1].dt[1]?.[1]?.[0]?.t;

                  let sn = sense[1]?.sn;
                  let sense_number = !isNaN(sn) ? sn : null;
                  let sense_letter = isNaN(sn) && sn.length === 1 ? sn : null;
                  let sense_letter_and_number = sn.length === 3 ? sn : null;

                  return (
                    <div key={index} className="flex flex-col gap-1">
                      <div className="flex">
                        {sense_number ? (
                          <p className="pr-4">{sense_number}</p>
                        ) : sense_letter ? (
                          <p className="pl-6 pr-2">{sense_letter}</p>
                        ) : (
                          sense_letter_and_number && (
                            <p className="flex gap-4 pr-2">
                              <span>
                                {sense_letter_and_number.split(" ")[0]}
                              </span>
                              <span>
                                {sense_letter_and_number.split(" ")[1]}
                              </span>
                            </p>
                          )
                        )}

                        {/* Definition */}
                        <p
                          dangerouslySetInnerHTML={{
                            __html: definition ? mwParser(definition) : "",
                          }}
                        ></p>
                      </div>
                      {/* Example */}
                      <p
                        dangerouslySetInnerHTML={{
                          __html: example ? mwParser(example) : "",
                        }}
                        className={`mt-1 border-l-2 border-zinc-600 text-zinc-400 ${
                          sn && "ml-6 pl-2"
                        }`}
                      ></p>
                    </div>
                  );
                });
              }
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
