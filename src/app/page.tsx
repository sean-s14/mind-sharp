import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex flex-col items-center p-24">
      <Link href="/vocab" className="group">
        <Card className="p-4 group-hover:bg-zinc-100 group-hover:dark:bg-zinc-900 group-hover:dark:border-zinc-700 hover:duration-500">
          <h1>Vocabulary Builder</h1>
          <Card className="mx-4 flex flex-col gap-3 mt-2 p-4 w-52">
            <h4 className="text-xs text-center">Word Of The Day</h4>
            <h2 className="text-center text-xl font-semibold">Equivocate</h2>
            <div className="flex flex-col gap-1">
              <p className="text-sm">Etymology</p>
              <div className="pl-3">
                <p>~~~~~~~~~~</p>
                <p>~~~~~~~~~~</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm">Definition</p>
              <div className="pl-3">
                <p>~~~~~~~~~~</p>
                <p>~~~~~~~~~~</p>
              </div>
            </div>
          </Card>
        </Card>
      </Link>
    </main>
  );
}
