"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";

export function FunFactCard({ fact }: { fact: string }) {
  return (
    <GlassCard className="relative overflow-hidden border-brand/20 bg-gradient-to-br from-brand/10 via-panel to-panel p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/15 text-brand"
      >
        <LightbulbIcon className="h-6 w-6" />
      </motion.div>
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-dim">Fun Fact</h3>
      <p className="text-base leading-relaxed text-foreground">&ldquo;{fact}&rdquo;</p>
    </GlassCard>
  );
}

function LightbulbIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.5.4.8 1 .8 1.7V16h5.6v-.5c0-.7.3-1.3.8-1.7A6 6 0 0 0 12 3z"
      />
    </svg>
  );
}
