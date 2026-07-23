import { Skeleton } from "@/components/ui/Skeleton";

export default function ChartsLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton className="mb-6 h-6 w-64" />
      <Skeleton className="mb-2 h-10 w-1/2" />
      <Skeleton className="mb-8 h-5 w-1/3" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
