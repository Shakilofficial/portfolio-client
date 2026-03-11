"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { InlineWidget } from "react-calendly";

const CalendlyEmbed = () => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return (
        <div className="h-[700px] w-full animate-pulse bg-slate-100 dark:bg-slate-800/50" />
    );

    const isDark = resolvedTheme === "dark";

    // Match the page background colors exactly
    const bgColor = isDark ? "030712" : "ffffff";
    const textColor = isDark ? "e2e8f0" : "0f172a";

    return (
        <div
            ref={containerRef}
            className="w-full overflow-hidden"
            style={{
                // Force the wrapper background to match the Calendly iframe bg
                backgroundColor: isDark ? "#030712" : "#ffffff",
            }}
        >
            <InlineWidget
                url="https://calendly.com/creative-shakilofficial/30min"
                styles={{
                    height: "700px",
                    width: "100%",
                    // Remove any default margins/padding the iframe might add
                    border: "none",
                    overflow: "hidden",
                }}
                pageSettings={{
                    backgroundColor: bgColor,
                    textColor: textColor,
                    primaryColor: "6366f1",
                    hideEventTypeDetails: false,
                    hideLandingPageDetails: false,
                }}
            />
        </div>
    );
};

export default CalendlyEmbed;