"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

// Animates a numeric stat like "12 000+" from 0 to its value when scrolled into
// view, preserving any prefix/suffix. Falls back to the literal for reduced motion.
export function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  const match = value.match(/^(\D*)([\d\s]+)(\D*)$/);
  const prefix = match?.[1] ?? "";
  const suffix = match?.[3] ?? "";
  const target = match ? parseInt(match[2].replace(/\D/g, ""), 10) : NaN;

  const [display, setDisplay] = useState(
    reduce || isNaN(target) ? value : `${prefix}0${suffix}`,
  );

  useEffect(() => {
    if (reduce || isNaN(target)) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) =>
        setDisplay(`${prefix}${Math.round(v).toLocaleString("ru-RU")}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, target, prefix, suffix, value, reduce]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
