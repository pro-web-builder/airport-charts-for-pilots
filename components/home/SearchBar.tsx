import { SearchAutocomplete } from "./SearchAutocomplete";

export function SearchBar() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <SearchAutocomplete size="lg" autoFocus={false} />
      <p className="mt-3 text-center text-xs text-foreground-dim/80">
        Try <span className="font-mono text-brand-dim">EGLL</span>,{" "}
        <span className="font-mono text-brand-dim">egll</span>, &ldquo;Heathrow&rdquo;, &ldquo;Dubai&rdquo;
        or &ldquo;New York&rdquo;
      </p>
    </div>
  );
}
