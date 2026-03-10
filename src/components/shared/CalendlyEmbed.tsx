"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";

const CalendlyEmbed = () => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="h-[650px] w-full animate-pulse bg-slate-100 dark:bg-slate-800/50 rounded-2xl" />;

    const isDark = resolvedTheme === "dark";

    return (
        <div className="flex-1 overflow-hidden">
            <InlineWidget
                url="https://calendly.com/creative-shakilofficial/30min"
                styles={{
                    height: "650px",
                    width: "100%",
                }}
                pageSettings={{
                    backgroundColor: isDark ? "030712" : "ffffff",
                    textColor: isDark ? "e5e7eb" : "111827",
                    primaryColor: "6366f1",
                    hideEventTypeDetails: false,
                    hideLandingPageDetails: false,
                }}
            />
        </div>
    );
};

export default CalendlyEmbed;