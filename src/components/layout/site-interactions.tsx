"use client";

import { useEffect, useRef, useState } from "react";

type ClickGlow = {
  id: number;
  x: number;
  y: number;
};

export function SiteInteractions() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [glows, setGlows] = useState<ClickGlow[]>([]);
  const idRef = useRef(1);

  useEffect(() => {
    function onMove(event: PointerEvent) {
      const cursor = cursorRef.current;
      if (!cursor) return;
      cursor.style.transform = `translate3d(${event.clientX - 13}px, ${event.clientY - 13}px, 0)`;
    }

    function onClick(event: PointerEvent) {
      const id = idRef.current++;
      setGlows((prev) => [...prev.slice(-5), { id, x: event.clientX, y: event.clientY }]);
      window.setTimeout(() => {
        setGlows((prev) => prev.filter((item) => item.id !== id));
      }, 580);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onClick, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onClick);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[35]">
      {/* Floating background bubbles */}
      <div className="site-bubbles-layer absolute inset-0 overflow-hidden">
        <span className="site-bubble site-bubble-1" />
        <span className="site-bubble site-bubble-2" />
        <span className="site-bubble site-bubble-3" />
        <span className="site-bubble site-bubble-4" />
        <span className="site-bubble site-bubble-5" />
        <span className="site-bubble site-bubble-6" />
      </div>

      {/* Cursor glow */}
      <div ref={cursorRef} className="site-cursor-glow" />

      {/* Click burst */}
      {glows.map((glow) => (
        <span
          key={glow.id}
          className="site-click-glow"
          style={{ left: glow.x, top: glow.y }}
          aria-hidden
        />
      ))}
    </div>
  );
}
