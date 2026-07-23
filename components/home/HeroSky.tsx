"use client";

import { motion, useReducedMotion } from "framer-motion";

// Synthetic daytime sky (layered gradients + SVG cloud shapes) with a slow
// parallax/zoom drift — built rather than sourced, since no photoreal image
// generation tool is available for a "realistic sky" asset.
export function HeroSky() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #1a6fd6 0%, #3f8fe8 25%, #7db8f2 50%, #bfdcf8 75%, #e9f3fc 100%)",
        }}
      />
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={reduceMotion ? { scale: 1 } : { scale: 1.08 }}
        transition={{ duration: 40, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      >
        <CloudLayer className="opacity-90" top="8%" speed={70} scale={1} />
        <CloudLayer className="opacity-70" top="30%" speed={95} scale={1.3} reverse />
        <CloudLayer className="opacity-60" top="55%" speed={120} scale={0.8} />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,7,13,0) 40%, rgba(5,7,13,0.55) 78%, rgba(5,7,13,0.92) 100%)",
        }}
      />
    </div>
  );
}

function CloudLayer({
  top,
  speed,
  scale,
  reverse,
  className,
}: {
  top: string;
  speed: number;
  scale: number;
  reverse?: boolean;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={`absolute left-0 flex w-[220%] ${className ?? ""}`}
      style={{ top }}
      initial={{ x: reverse ? "-50%" : "0%" }}
      animate={reduceMotion ? {} : { x: reverse ? "0%" : "-50%" }}
      transition={{ duration: speed, ease: "linear", repeat: Infinity }}
    >
      <CloudRow scale={scale} />
      <CloudRow scale={scale} />
    </motion.div>
  );
}

function CloudRow({ scale }: { scale: number }) {
  return (
    <svg viewBox="0 0 800 200" className="h-32 w-1/2 sm:h-48" style={{ transform: `scale(${scale})` }}>
      <g fill="#ffffff">
        <ellipse cx="90" cy="120" rx="80" ry="34" />
        <ellipse cx="160" cy="100" rx="60" ry="42" />
        <ellipse cx="230" cy="125" rx="70" ry="30" />
        <ellipse cx="420" cy="110" rx="90" ry="36" />
        <ellipse cx="500" cy="90" rx="55" ry="38" />
        <ellipse cx="580" cy="115" rx="65" ry="28" />
        <ellipse cx="700" cy="130" rx="75" ry="32" />
      </g>
    </svg>
  );
}
