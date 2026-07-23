import { Skeleton } from "@/components/ui/Skeleton";

export default function ChartCategoryLoading() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton className="mb-6 h-6 w-72" />
      <Skeleton className="mb-2 h-10 w-1/2" />
      <Skeleton className="mb-8 h-5 w-1/3" />
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
