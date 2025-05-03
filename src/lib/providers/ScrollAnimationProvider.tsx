"use client";

import type React from "react";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect } from "react";

interface ScrollAnimationProviderProps {
  children: React.ReactNode;
}

export default function ScrollAnimationProvider({
  children,
}: ScrollAnimationProviderProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Add scroll-based classes to elements with data-scroll attributes
  useEffect(() => {
    const handleScroll = () => {
      const scrollElements = document.querySelectorAll("[data-scroll]");

      scrollElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible =
          rect.top < window.innerHeight * 0.8 && rect.bottom > 0;

        if (isVisible) {
          element.classList.add("scroll-visible");
        }
      });
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 z-[100] origin-left"
        style={{ scaleX }}
      />
      {children}
    </>
  );
}
