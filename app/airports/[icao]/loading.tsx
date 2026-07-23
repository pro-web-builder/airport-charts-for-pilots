import { Skeleton } from "@/components/ui/Skeleton";

export default function AirportLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton className="mb-6 h-6 w-64" />

      <div className="flex flex-col gap-6">
        <div>
          <Skeleton className="mb-2 h-6 w-32" />
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="mt-2 h-5 w-1/3" />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Skeleton className="h-80 rounded-2xl" />
        <Skeleton className="h-80 rounded-2xl" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-48 rounded-2xl" />
      </div>

      <Skeleton className="mt-8 h-32 rounded-2xl" />
    </div>
  );
}
