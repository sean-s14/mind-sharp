import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchWord } from "@/api/fetchWord";
import { getWordMeta } from "@/app/vocab/actions";
import { capitalise } from "@sean14/utils";
import { mwParser } from "@/utils/mw-parser";
import DeleteWord from "./deleteWord";
import { getViewColor } from "@/utils/tailwind";

export default async function Word({ wordId }: { wordId: string }) {
  const userWordMeta = await getWordMeta(wordId);
  const [word, homonym] = wordId.split(":");
  const data = await fetchWord(word);
  const wordData = homonym ? data[parseInt(homonym) - 1] : data[0];

  if ("error" in userWordMeta)
    return <div className="text-red-500">{userWordMeta.error}</div>;

  return (
    <Card className="p-4 mt-4 w-[600px] max-w-[90%] relative">
      <div
        className={`absolute right-4 px-1.5 rounded ${getViewColor(
          userWordMeta.views
        )}`}
        aria-label="view count"
      >
        {userWordMeta.views}
      </div>
      <CardHeader>
        <CardTitle className="text-center text-6xl font-thin mb-8">
          {capitalise(word)}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-left flex flex-col gap-6">
        {/* Etymomlogy */}
        <div>
          <h3 className="font-semibold pb-2">Etymology</h3>
          <p
            className="pl-4 text-sm"
            dangerouslySetInnerHTML={{
              __html: mwParser(wordData?.et?.[0]?.[1] || ""),
            }}
          ></p>
        </div>

        {/* Definitions + Examples */}
        <div>
          <h3 className="font-semibold pb-2">Definitions</h3>
          <div className="flex flex-col gap-3">
            {wordData?.def[0]?.sseq?.map(
              (sense_sequence: any[], index: number) => {
                return sense_sequence.map((sense: any, index: number) => {
                  const definition = sense?.[1].dt?.[0]?.[1];
                  let example = sense?.[1].dt?.[1]?.[1]?.[0]?.t;
                  let sn = sense[1]?.sn;
                  let sense_number = !isNaN(sn) ? sn : null;
                  let sense_letter = isNaN(sn) && sn?.length === 1 ? sn : null;
                  let sense_letter_and_number = sn?.length === 3 ? sn : null;

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
                        className={`mt-1 border-l-2 pl-2 border-zinc-600 text-zinc-400 ${
                          sn && "ml-6"
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
      <CardFooter className="flex flex-col">
        <hr className="w-[90%] my-6" />
        <DeleteWord wordId={wordId} />
      </CardFooter>
    </Card>
  );
}
