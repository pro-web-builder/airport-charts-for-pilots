import { LinkButton } from "@/components/ui/Button";
import { LogoIcon } from "@/components/brand/LogoIcon";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-32 text-center">
      <LogoIcon className="h-16 w-16" withBackground />
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-dim">404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Off the charted route
        </h1>
        <p className="mt-3 max-w-md text-foreground-dim">
          This page didn&rsquo;t make it onto the flight plan. Let&rsquo;s get you back on course.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <LinkButton href="/" variant="primary">
          Return Home
        </LinkButton>
        <LinkButton href="/airports" variant="outline">
          Browse Airports
        </LinkButton>
      </div>
    </div>
  );
}
