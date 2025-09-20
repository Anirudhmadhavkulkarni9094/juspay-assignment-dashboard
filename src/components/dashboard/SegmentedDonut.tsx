// src/component/dashboard/SegmentedDonut.tsx
"use client";
import { useTheme } from "@/context/ThemeContext";
import React from "react";

type SegmentedDonutProps = {
  segments: number[];            // numeric values for segments
  labels?: string[];            // optional labels for each segment (for tooltip)
  colors?: string[];            // colors for segments
  size?: number;                // SVG width/height
  strokeWidth?: number;         // thickness of the ring
  gapDeg?: number;              // degrees of gap between segments
  centerLabel?: string;         // center text (e.g. "38.6%")
};

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180.0;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

export default function SegmentedDonut({
  segments,
  labels = [],
  colors,
  size = 180,
  strokeWidth = 28,
  gapDeg = 6,
  centerLabel,
}: SegmentedDonutProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - strokeWidth) / 2;
  const total = Math.max(1, segments.reduce((s, v) => s + v, 0));
  const palette = colors ?? ["#A7F3D0", "#BFDBFE", "#C7B2FF", "#111827", "#93C5FD", "#60A5FA"];

  const [tooltip, setTooltip] = React.useState<{ text: string; left: number; top: number } | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // build segment arcs (cumulative angles)
  let cursor = 0;
  const segs = segments.map((value, idx) => {
    const portion = (value / total) * 360;
    const start = cursor;
    const end = cursor + portion;
    cursor = end;
    return { value, idx, start, end, color: palette[idx % palette.length], label: labels[idx] ?? `${Math.round((value / total) * 100)}%` };
  });

  function showTooltip(seg: { start: number; end: number; value: number; label: string }, e: React.MouseEvent) {
    const mid = (seg.start + seg.end) / 2;
    const pt = polarToCartesian(cx, cy, r, mid);
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const left = rect.left + pt.x;
    const top = rect.top + pt.y;
    setTooltip({ text: seg.label, left, top });
  }
  function hideTooltip() {
    setTooltip(null);
  }

    const { theme, resolvedTheme, toggleTheme, themeStyles } = useTheme();


  return (
    <div ref={containerRef} className="relative inline-block" style={{ width: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* subtle background ring */}
        <circle cx={cx} cy={cy} r={r} stroke="#F1F5F9" strokeWidth={strokeWidth} fill="none" />

        {/* segments */}
        {segs.map((s) => {
          const halfGap = gapDeg / 2;
          const sStart = s.start + halfGap;
          const sEnd = s.end - halfGap;
          if (sEnd - sStart <= 0.5) return null;
          const d = describeArc(cx, cy, r, sStart, sEnd);
          return (
            <path
              key={s.idx}
              d={d}
              stroke={s.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              fill="none"
              onMouseEnter={(e) => showTooltip(s, e)}
              onMouseMove={(e) => showTooltip(s, e)}
              onMouseLeave={hideTooltip}
              style={{ transition: "opacity 120ms, transform 120ms", cursor: "pointer" }}
            />
          );
        })}

        {/* center hole */}
        <circle cx={cx} cy={cy} r={r - strokeWidth / 2} fill={theme == "dark" ? "#0b1220" : "#F8FAFC"} />

        {/* center label */}
        {centerLabel && (
          <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize={20} fontWeight={700} fill={theme === "dark" ?  "white"  : "#0F172A"}>
            {centerLabel}
          </text>
        )}
      </svg>

      {/* floating tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none z-50"
          style={{
            position: "fixed",
            left: tooltip.left,
            top: tooltip.top,
            transform: "translate(-50%, -140%)",
          }}
        >
          <div className="bg-gray-800 text-white text-sm px-3 py-1 rounded shadow-lg whitespace-nowrap">
            {tooltip.text}
          </div>
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid #1f2937",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 4,
            }}
          />
        </div>
      )}
    </div>
  );
}
