import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { GlassCard } from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "About",
  description: "About Airport Charts For Pilots.",
};

const FEATURES = [
  {
    title: "Worldwide Airport Search",
    body: "Search by ICAO, IATA, airport name, city or country — case-insensitive, with instant autocomplete.",
  },
  {
    title: "Detailed Airport Information",
    body: "Runways, frequencies, elevation, timezone, coordinates, live METAR/TAF and sunrise/sunset times.",
  },
  {
    title: "Airport Charts",
    body: "Diagrams, SID/STAR, ILS/RNAV/VOR/visual approaches, taxi and parking charts, organized by category.",
  },
  {
    title: "Built for Aviation",
    body: "Designed for pilots, student pilots, flight simulator users and aviation enthusiasts alike.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />

      <h1 className="mt-6 mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        About Airport Charts For Pilots
      </h1>
      <p className="mb-10 max-w-2xl text-foreground-dim">
        Airport Charts For Pilots is a platform for exploring airports around the world — built for
        pilots, student pilots, flight simulator users and aviation enthusiasts who want fast access to
        airport information and charts in one place.
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {FEATURES.map((feature) => (
          <GlassCard key={feature.title} className="p-5">
            <h3 className="font-semibold text-foreground">{feature.title}</h3>
            <p className="mt-2 text-sm text-foreground-dim">{feature.body}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="mt-8 p-5">
        <h3 className="font-semibold text-foreground">A note on chart data</h3>
        <p className="mt-2 text-sm text-foreground-dim">
          Charts shown in this version of the platform are placeholders for demonstration purposes and
          are not suitable for real-world navigation. The underlying data model is built so real,
          up-to-date chart data can be added later without any structural changes.
        </p>
      </GlassCard>
    </div>
  );
}
