"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function AirportError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        Couldn&rsquo;t load this airport
      </h1>
      <p className="max-w-md text-foreground-dim">
        Something went wrong fetching this airport&rsquo;s data. This may be temporary — try again.
      </p>
      <Button onClick={reset} variant="primary">
        Try Again
      </Button>
    </div>
  );
}
