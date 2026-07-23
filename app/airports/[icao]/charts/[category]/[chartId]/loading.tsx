import { Skeleton } from "@/components/ui/Skeleton";

export default function ChartViewerLoading() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton className="mb-6 h-6 w-72" />
      <Skeleton className="mb-4 h-16 rounded-2xl" />
      <Skeleton className="h-[75vh] rounded-2xl" />
    </div>
  );
}
