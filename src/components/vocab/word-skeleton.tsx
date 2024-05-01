import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function WordSkeleton() {
  return (
    <Card className="w-[600px] max-w-[90%] h-[500px] rounded-lg flex flex-col gap-6 px-4 py-10">
      <Skeleton className="w-[50%] h-[60px] rounded-xl self-center mb-10" />
      <div className="flex flex-col gap-3">
        <Skeleton className="w-[20%] h-[24px] rounded-3xl" />
        <Skeleton className="w-[80%] h-[24px] rounded-3xl" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="w-[20%] h-[24px] rounded-3xl" />
        <Skeleton className="w-[80%] h-[24px] rounded-3xl" />
        <Skeleton className="w-[80%] h-[24px] rounded-3xl" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="w-[20%] h-[24px] rounded-3xl" />
        <Skeleton className="w-[80%] h-[24px] rounded-3xl" />
        <Skeleton className="w-[80%] h-[24px] rounded-3xl" />
      </div>
    </Card>
  );
}
