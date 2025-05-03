/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
  className?: string;
}

export default function ScrollReveal({
  children,
  width = "fit-content",
  delay = 0,
  direction = "up",
  duration = 0.5,
  once = true,
  className = "",
}: ScrollRevealProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: 0.3 });

  // Set initial animation states based on direction
  const getInitialState = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 50 };
      case "down":
        return { opacity: 0, y: -50 };
      case "left":
        return { opacity: 0, x: 50 };
      case "right":
        return { opacity: 0, x: -50 };
      case "none":
        return { opacity: 0 };
      default:
        return { opacity: 0, y: 50 };
    }
  };

  // Set animation target states based on direction
  const getAnimateState = () => {
    switch (direction) {
      case "up":
      case "down":
        return { opacity: 1, y: 0 };
      case "left":
      case "right":
        return { opacity: 1, x: 0 };
      case "none":
        return { opacity: 1 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  useEffect(() => {
    if (inView) {
      controls.start(getAnimateState());
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={getInitialState()}
      animate={controls}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Improved easing function
      }}
      style={{ width }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
