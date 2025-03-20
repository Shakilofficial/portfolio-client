"use client";

import { animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  formatValue?: (value: number) => string;
}

export function AnimatedCounter({
  value,
  duration = 1,
  formatValue = (value) => Math.round(value).toString(),
}: AnimatedCounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const prevValue = useRef<number>(0);

  useEffect(() => {
    const node = nodeRef.current;

    if (node) {
      const controls = animate(prevValue.current, value, {
        duration,
        onUpdate: (value) => {
          node.textContent = formatValue(value);
        },
      });

      prevValue.current = value;

      return () => controls.stop();
    }
  }, [value, duration, formatValue]);

  return <span ref={nodeRef}>{formatValue(0)}</span>;
}
