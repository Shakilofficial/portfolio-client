"use client";

interface RippleProps {
  className?: string;
  color?: string;
  duration?: number;
  count?: number;
}

export const Ripple = ({
  className = "",
  color = "rgba(147, 51, 234, 0.3)", // Purple-500 with opacity
  duration = 2,
  count = 4,
}: RippleProps) => {
  return (
    <div className={`relative ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            border: `2px solid ${color}`,
            height: "100%",
            width: "100%",
            transform: "translate(-50%, -50%) scale(1)",
            opacity: 1,
            animation: `ripple ${duration}s ease ${i * 0.5}s infinite`,
          }}
        />
      ))}
    </div>
  );
};
