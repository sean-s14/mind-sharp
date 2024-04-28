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
import { useToast } from "@/components/ui/use-toast";
import { useFormState, useFormStatus } from "react-dom";
import { addWord } from "../actions";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const initialState = {
  message: "",
  id: null,
  uuid: null,
};

export default function AddWordPage() {
  const { toast } = useToast();
  const [word, setWord] = useState("");
  const [debouncedWord] = useDebounce(word, 500);
  const [openDialog, setOpenDialog] = useState(false);
  const [choice, setChoice] = useState("");
  const [state, formAction] = useFormState(addWord, initialState);
  const { pending } = useFormStatus();
  const [id, setId] = useState("");
  const [uuid, setUuid] = useState("");

  const { data: wordData, isLoading } = useQuery({
    queryKey: [debouncedWord],
    queryFn: () => fetchWord(debouncedWord),
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  });

  useEffect(() => {
    setChoice("");
    setId("");
    setUuid("");
    setOpenDialog(false);

    if ("message" in state)
      if (state.message === "") {
      } else if (state.message === "success") {
        toast({
          title: `New Word Added`,
          description: `New word "${word}" added to vocabulary builder`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: state.message,
        });
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

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
          <li key={index} className="mt-4">
            <button
              onClick={() => {
                setChoice("Homonym " + (index + 1));
                setId(word.meta.id);
                setUuid(word.meta.uuid);
                setOpenDialog(true);
              }}
            >
              <Card className="dark:hover:bg-zinc-800 hover:bg-zinc-200 text-left">
                <CardHeader>
                  <CardTitle className="text-xl">Homonym {index + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="pl-4 flex flex-col gap-4">
                    {word?.shortdef?.map(
                      (definition: string, index: number) => (
                        <li key={index}>
                          <CardTitle className="text-lg">
                            Definition {index + 1}
                          </CardTitle>
                          <CardDescription className="text-md mt-1 pl-4">
                            {capitalise(definition)}
                          </CardDescription>
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>
            </button>
          </li>
        ))}
      </ul>

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
            <AlertDialogCancel
              onClick={() => {
                setOpenDialog(false);
                setChoice("");
                setId("");
                setUuid("");
              }}
            >
              Cancel
            </AlertDialogCancel>
            <form action={formAction}>
              <input type="hidden" name="id" value={id} />
              <input type="hidden" name="uuid" value={uuid} />
              <AlertDialogAction
                type="submit"
                disabled={pending}
                aria-disabled={pending}
              >
                Add
              </AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
