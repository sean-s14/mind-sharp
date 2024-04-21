"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetchWord } from "@/api/fetchWord";
import { capitalise } from "@sean14/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AddWordPage() {
  const [word, setWord] = useState("");
  const [debouncedWord] = useDebounce(word, 500);
  const [openDialog, setOpenDialog] = useState(false);
  const [choice, setChoice] = useState("");

  const { data: wordData, isLoading } = useQuery({
    queryKey: [debouncedWord],
    queryFn: () => fetchWord(debouncedWord),
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  });

  return (
    <div className="flex flex-col items-center py-10">
      <Input
        type="text"
        placeholder="Search for word"
        className="w-[640px] max-w-[90%] h-12 text-2xl text-center"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      {wordData && (
        <h1 className="text-xl font-medium m-4 w-[600px] max-w-[90%] text-center">
          Select the homonym of the word you would like to add below &#8681;
        </h1>
      )}
      <ul className="w-[640px] max-w-[90%]">
        {wordData?.map((word: any, index: number) => (
          <li key={index} className="mt-4 border border-zinc-600 rounded-lg">
            <button
              className="p-4 w-full rounded-lg flex flex-col items-start text-left hover:bg-zinc-600"
              onClick={() => {
                setChoice("Homonym " + (index + 1));
                setOpenDialog(true);
              }}
            >
              <h2 className="text-xl font-semibold">Homonym {index + 1}</h2>
              <ul className="pl-4">
                {word.shortdef.map((definition: string, index: number) => (
                  <li key={index} className="mt-2">
                    <h3 className="text-lg">Definition {index + 1}</h3>
                    <p className="pl-4">{capitalise(definition)}</p>
                  </li>
                ))}
              </ul>
            </button>
          </li>
        ))}
      </ul>
      {openDialog && (
        <AlertDialog open={openDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to add &#34;{choice}&#34;?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action will add &#34;{choice}&#34; of the word &#34;{word}
                &#34; to your vocabulary builder
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="sm:justify-center">
              <AlertDialogCancel onClick={() => setOpenDialog(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => setOpenDialog(false)}>
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
