"use client";

import { useRouter } from "next/navigation";

type BackButtonProps = {
  fallbackHref?: string;
  className?: string;
};

export function BackButton({ fallbackHref = "/", className }: BackButtonProps) {
  const router = useRouter();

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`group inline-flex items-center gap-2 rounded-full border border-panel-border bg-panel px-4 py-2 text-sm font-medium text-foreground-dim transition-all hover:border-brand/50 hover:text-foreground hover:-translate-x-0.5 ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Back
    </button>
  );
}
