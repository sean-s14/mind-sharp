import Word from "@/components/vocab/word";
import { Suspense } from "react";
import WordSkeleton from "@/components/vocab/word-skeleton";

export default async function WordDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = decodeURIComponent(params.id);

  return (
    <div className="flex flex-col items-center py-6">
      <Suspense fallback={<WordSkeleton />}>
        <Word wordId={id} />
      </Suspense>
    </div>
  );
}
