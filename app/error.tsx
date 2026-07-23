"use client";

import { useEffect } from "react";
import { Button, LinkButton } from "@/components/ui/Button";
import { LogoIcon } from "@/components/brand/LogoIcon";

export default function GlobalError({
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
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-32 text-center">
      <LogoIcon className="h-16 w-16" withBackground />
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-red-400">Turbulence</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Something went wrong
        </h1>
        <p className="mt-3 max-w-md text-foreground-dim">
          An unexpected error occurred while loading this page. You can try again, or head back home.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={reset} variant="primary">
          Try Again
        </Button>
        <LinkButton href="/" variant="outline">
          Return Home
        </LinkButton>
      </div>
    </div>
  );
}
