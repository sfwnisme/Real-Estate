import { Skeleton } from "../../../components/ui/skeleton";

export default async function BlogPostCardSkeleton({
  count,
}: {
  count: number;
}) {
  const countArray = Array.from({ length: count });
  return (
    <>
      {countArray.map((_, idx) => (
        <div className="group relative flex flex-col gap-4 rounded-2xl overflow-hidden" key={idx}>
          <div className="h-[300px]">
            <Skeleton className="w-full h-full grid bg-gray-100" />
          </div>
        </div>
      ))}
    </>
  );
}
