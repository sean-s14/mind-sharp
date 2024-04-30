"use client";

import { useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useToast } from "@/components/ui/use-toast";
import { deleteWord } from "@/app/vocab/actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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

const initialState = {
  message: "",
  error: "",
  wordId: "",
};

export default function DeleteWord({ wordId }: { wordId: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [state, formAction] = useFormState(deleteWord, {
    ...initialState,
    wordId: wordId,
  });
  const { pending } = useFormStatus();
  const [openDialog, setOpenDialog] = useState(false);

  const word = wordId?.split(":")[0];

  const toggleDialog = () => setOpenDialog((prev) => !prev);

  useEffect(() => {
    setOpenDialog(false);

    if (state.error.length > 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.error,
      });
    }

    if (state.message === "success") {
      router.push("/vocab");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div>
      <Button variant={"destructive"} onClick={toggleDialog}>
        Delete &#34;{word}&#34;
      </Button>

      <AlertDialog open={openDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete &#34;{word}&#34;?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action will delete &#34;{word}&#34; from your vocabulary
              builder
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogCancel
              onClick={() => {
                setOpenDialog(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <form action={formAction}>
              <input type="hidden" name="wordId" value={wordId} />
              <AlertDialogAction
                type="submit"
                disabled={pending}
                aria-disabled={pending}
              >
                Delete
              </AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
