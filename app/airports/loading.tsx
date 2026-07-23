import { Skeleton } from "@/components/ui/Skeleton";

export default function AirportsLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton className="mb-6 h-6 w-48" />
      <Skeleton className="mb-2 h-10 w-1/3" />
      <Skeleton className="mb-4 h-5 w-1/2" />
      <Skeleton className="mb-10 h-12 w-full max-w-xl rounded-xl" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
