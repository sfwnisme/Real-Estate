import { Skeleton } from "../../../components/ui/skeleton";

export default async function PropertyCardGridSkeleton({count = 3}: {count: number}) {
  const skeletonArray = Array.from({ length: count });
  return (
    <div className={`grid md:grid-cols-2 xl:grid-cols-3 gap-4 mt-10`}>
      {skeletonArray.map((_, idx) => (
        <div className="group relative flex flex-col gap-4 rounded-2xl overflow-hidden" key={idx}>
          <div className="h-[350px]">
            <Skeleton className="w-full h-full grid" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-xl:bottom-5 max-xl:rounded-2xl max-xl:w-[90%] transition-all duration-500 flex items-center">
            <Skeleton className="w-full h-24 grid" />
          </div>
        </div>
      ))}
    </div>
  );
}
