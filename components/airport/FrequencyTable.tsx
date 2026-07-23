import { GlassCard } from "@/components/ui/GlassCard";
import { formatFrequency, formatFrequencyType } from "@/lib/utils/formatFrequency";

type Frequency = {
  id: string;
  type: string;
  description: string | null;
  frequencyMhz: number;
};

export function FrequencyTable({ frequencies }: { frequencies: Frequency[] }) {
  if (frequencies.length === 0) {
    return <p className="text-sm text-foreground-dim">No frequency data available.</p>;
  }

  return (
    <GlassCard className="divide-y divide-panel-border overflow-hidden">
      {frequencies.map((freq) => (
        <div key={freq.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
          <div>
            <p className="text-sm font-medium text-foreground">{formatFrequencyType(freq.type)}</p>
            {freq.description && <p className="text-xs text-foreground-faint">{freq.description}</p>}
          </div>
          <span className="font-mono text-sm font-semibold text-brand-dim">
            {formatFrequency(freq.frequencyMhz)}
          </span>
        </div>
      ))}
    </GlassCard>
  );
}
