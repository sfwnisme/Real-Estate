import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyPageSkeleton() {
  return (
    <div className="grid gap-8">
      <Skeleton className="h-[400px] md:h-[500px] w-full rounded-2xl" />
      <Skeleton className="h-[160px] md:h-[100px] w-full rounded-2xl" />
      <article className="flex-1">
        <Skeleton className="h-[40px] w-full md:w-5/12 mb-10" />
        <div className="grid gap-4">
          <Skeleton className="h-6 w-12/12" />
          <Skeleton className="h-6 w-9/12" />
          <Skeleton className="h-6 w-7/12" />
          <Skeleton className="h-6 w-10/12" />
          <Skeleton className="h-6 w-5/12" />
        </div>
      </article>
      <Skeleton className="h-[450px] w-full rounded-2xl" />
    </div>
  );
}
