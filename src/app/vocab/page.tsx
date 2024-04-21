import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function VocabularyBuilder() {
  return (
    <div className="flex flex-col items-center py-4">
      <h1 className="text-2xl mb-4">Vocabulary Builder</h1>
      <Button>
        <Link href="/vocab/add" className="text-lg font-semibold">
          + New word
        </Link>
      </Button>
    </div>
  );
}
