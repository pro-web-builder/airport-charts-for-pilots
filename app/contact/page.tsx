import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { GlassCard } from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Airport Charts For Pilots team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <h1 className="mt-6 mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Contact Us
      </h1>
      <p className="mb-8 max-w-xl text-foreground-dim">
        Questions, feedback, or spotted an issue with an airport&rsquo;s data? Reach out — we&rsquo;d love
        to hear from you.
      </p>

      <GlassCard className="flex flex-col gap-4 p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground-faint">Email</p>
          <a href="mailto:hello@airportchartsforpilots.example" className="text-brand-dim hover:underline">
            hello@airportchartsforpilots.example
          </a>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground-faint">
            Response Time
          </p>
          <p className="text-sm text-foreground-dim">We typically respond within 2–3 business days.</p>
        </div>
      </GlassCard>
    </div>
  );
}
