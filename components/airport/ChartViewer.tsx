import { Badge } from "@/components/ui/Badge";
import type { ChartSummary } from "@/types/chart";

export function ChartViewer({ chart }: { chart: ChartSummary }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="glass-panel flex flex-wrap items-center justify-between gap-3 rounded-2xl px-5 py-4">
        <div>
          <h2 className="font-semibold text-foreground">{chart.title}</h2>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-foreground-dim">
            {chart.identifier && <span>{chart.identifier}</span>}
            {chart.revisionDate && (
              <span>
                Revision {new Date(chart.revisionDate).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
            {chart.isPlaceholder && <Badge tone="warning">Placeholder — not for navigation</Badge>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={chart.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-panel-border px-4 py-2 text-sm font-medium text-foreground-dim transition-colors hover:border-brand/50 hover:text-foreground"
          >
            Open in New Tab
          </a>
          <a
            href={chart.fileUrl}
            download
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dim"
          >
            Download
          </a>
        </div>
      </div>

      <div className="glass-panel overflow-hidden rounded-2xl">
        <iframe
          src={chart.fileUrl}
          title={chart.title}
          className="h-[75vh] w-full"
        />
      </div>
    </div>
  );
}
