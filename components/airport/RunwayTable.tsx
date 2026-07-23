import { GlassCard } from "@/components/ui/GlassCard";

type Runway = {
  id: string;
  ident: string;
  lengthFt: number | null;
  widthFt: number | null;
  surface: string | null;
  lighted: boolean;
  headingDegT: number | null;
};

export function RunwayTable({ runways }: { runways: Runway[] }) {
  if (runways.length === 0) {
    return <p className="text-sm text-foreground-dim">No runway data available.</p>;
  }

  return (
    <GlassCard className="overflow-hidden">
      <div className="hidden grid-cols-5 gap-4 border-b border-panel-border px-5 py-3 text-xs font-semibold uppercase tracking-wider text-foreground-faint sm:grid">
        <span>Runway</span>
        <span>Length</span>
        <span>Width</span>
        <span>Surface</span>
        <span>Lighting</span>
      </div>
      <div className="divide-y divide-panel-border">
        {runways.map((runway) => (
          <div key={runway.id} className="flex flex-col gap-2 px-5 py-4 sm:grid sm:grid-cols-5 sm:items-center sm:gap-4 sm:py-3">
            <span className="font-mono text-sm font-semibold text-brand-dim">{runway.ident}</span>
            <span className="text-sm text-foreground-dim">
              <span className="text-foreground-faint sm:hidden">Length: </span>
              {runway.lengthFt ? `${runway.lengthFt.toLocaleString()} ft` : "—"}
            </span>
            <span className="text-sm text-foreground-dim">
              <span className="text-foreground-faint sm:hidden">Width: </span>
              {runway.widthFt ? `${runway.widthFt} ft` : "—"}
            </span>
            <span className="text-sm text-foreground-dim">
              <span className="text-foreground-faint sm:hidden">Surface: </span>
              {runway.surface ?? "—"}
            </span>
            <span className="text-sm text-foreground-dim">
              <span className="text-foreground-faint sm:hidden">Lighting: </span>
              {runway.lighted ? "Lighted" : "Unlighted"}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
