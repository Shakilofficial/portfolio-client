import { useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number | string;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix = "",
}) => {
  const [count, setCount] = useState<number>(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      const targetValue = parseFloat(value as string);
      const timer = setInterval(() => {
        setCount((prev) => {
          if (prev < targetValue) {
            return Math.min(prev + 0.1, targetValue);
          }
          return targetValue;
        });
      }, 50);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toFixed(1)}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
