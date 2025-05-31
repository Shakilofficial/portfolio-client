"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import type React from "react";
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
      <style jsx global>{`
        /* Customize default scrollbar for WebKit browsers */
        ::-webkit-scrollbar {
          width: 4px; /* Thinner scrollbar width */
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #6b7280, #a5b4fc);
          border-radius: 9999px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #4b5563, #818cf8);
        }
        /* Customize default scrollbar for Firefox */
        html {
          scrollbar-width: thin; /* Thinner scrollbar */
          scrollbar-color: #a5b4fc transparent; /* Thumb and track colors */
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[0.5px] bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 z-[100] origin-left"
        style={{ scaleX }}
      />
      {children}
    </>
  );
}
