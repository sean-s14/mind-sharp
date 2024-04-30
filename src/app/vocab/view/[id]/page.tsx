import Word from "@/components/vocab/word";

export default async function ViewWordPage({
  params,
}: {
  params: { id: string };
}) {
  const id = decodeURIComponent(params.id);

  return (
    <div className="flex flex-col items-center py-6">
      <Word wordId={id} />
    </div>
  );
}
