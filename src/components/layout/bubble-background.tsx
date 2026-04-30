"use client";

const bubbles = [
  { size: 220, left: "6%", delay: "0s", duration: "12s" },
  { size: 160, left: "20%", delay: "1.2s", duration: "11s" },
  { size: 280, left: "35%", delay: "0.5s", duration: "14s" },
  { size: 180, left: "52%", delay: "1.7s", duration: "12.5s" },
  { size: 260, left: "70%", delay: "0.8s", duration: "13s" },
  { size: 140, left: "85%", delay: "2.2s", duration: "10.5s" },
];

export function BubbleBackground() {
  return (
    <div aria-hidden className="bubble-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bubble-glow bubble-glow-1" />
      <div className="bubble-glow bubble-glow-2" />
      {bubbles.map((bubble, index) => (
        <span
          key={`${bubble.left}-${index}`}
          className="bubble"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.left,
            animationDelay: bubble.delay,
            animationDuration: bubble.duration,
          }}
        />
      ))}
    </div>
  );
}

