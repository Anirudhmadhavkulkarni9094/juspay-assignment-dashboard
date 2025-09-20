"use client";
import React, { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTheme } from "@/context/ThemeContext";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

function gradient(ctx: CanvasRenderingContext2D, area: { top: number; bottom: number }, colorTop: string, colorBottom: string) {
  const g = ctx.createLinearGradient(0, area.top, 0, area.bottom);
  g.addColorStop(0, colorTop);
  g.addColorStop(1, colorBottom);
  return g;
}

export default function RevenueLineChart({
  height = 260,
  current = [8, 14, 10, 16, 12, 22],
  previous = [12, 11, 9, 10, 14, 20],
}: {
  height?: number;
  current?: number[];
  previous?: number[];
}) {
  const chartRef = useRef<any>(null);
  const { resolvedTheme, themeStyles } = useTheme();

  // choose colors depending on theme
  const isDark = resolvedTheme === "dark";

  // Colors (hex / rgba) for datasets, grid, ticks, tooltip
  const colors = {
    currentBorder: isDark ? "#8b5cf6" : "#2563eb", // purple in dark, blue in light
    currentGradientTop: isDark ? "rgba(139,92,246,0.18)" : "rgba(59,130,246,0.28)",
    currentGradientBottom: isDark ? "rgba(255,255,255,0.02)" : "rgba(59,130,246,0.02)",
    previousBorder: isDark ? "#c7b2ff" : "#111827", // lighter dotted line in dark
    grid: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
    ticks: isDark ? "#94a3b8" : "#6b7280",
    ticksY: isDark ? "#9CA3AF" : "#9CA3AF",
    tooltipBg: isDark ? "#0f1724" : "#0f1724",
    tooltipText: isDark ? "#e6eef8" : "#ffffff",
  };

  const data = {
    labels: months,
    datasets: [
      {
        label: "Current Week",
        data: current,
        fill: "start" as const,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const ctx: CanvasRenderingContext2D | undefined = chart?.ctx;
          const area = chart?.chartArea;
          if (!ctx || !area) {
            return isDark ? "rgba(139,92,246,0.12)" : "rgba(59,130,246,0.12)";
          }
          return gradient(ctx, area, colors.currentGradientTop, colors.currentGradientBottom);
        },
        borderColor: colors.currentBorder,
        borderWidth: 3,
        pointRadius: 4,
        tension: 0.35,
      },
      {
        label: "Previous Week",
        data: previous,
        borderColor: colors.previousBorder,
        borderWidth: 2,
        borderDash: [6, 6],
        pointRadius: 0,
        tension: 0.35,
      },
    ],
  };

  // external tooltip that respects theme
  const externalTooltip = (context: any) => {
    const tooltipModel = context.tooltip;
    if (!tooltipModel) return;

    let tooltipEl = document.getElementById("chartjs-tooltip");
    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.id = "chartjs-tooltip";
      document.body.appendChild(tooltipEl);
    }

    if (tooltipModel.opacity === 0) {
      tooltipEl.style.opacity = "0";
      return;
    }

    const title = tooltipModel.title ?? [];
    const bodyLines = tooltipModel.body ? tooltipModel.body.map((b: any) => b.lines).flat() : [];

    tooltipEl.innerHTML = `
      <div style="
        border-radius:8px;
        padding:8px 10px;
        font-size:13px;
        background:${colors.tooltipBg};
        color:${colors.tooltipText};
        box-shadow: 0 8px 20px rgba(2,6,23,0.18);
        font-weight:600;
        white-space:nowrap;
      ">
        <div style="font-weight:700;margin-bottom:4px;">${title.join("")}</div>
        <div style="font-weight:400;">${bodyLines.join("<br/>")}</div>
      </div>
    `;

    const canvasRect = context.chart?.canvas?.getBoundingClientRect?.();
    const caretX = tooltipModel.caretX ?? (canvasRect ? canvasRect.width / 2 : 0);
    const caretY = tooltipModel.caretY ?? 0;

    if (canvasRect) {
      tooltipEl.style.position = "absolute";
      tooltipEl.style.left = `${canvasRect.left + caretX}px`;
      tooltipEl.style.top = `${canvasRect.top + caretY - 10}px`;
      tooltipEl.style.opacity = "1";
      tooltipEl.style.transform = "translate(-50%, -100%)";
      tooltipEl.style.pointerEvents = "none";
    }
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: false,
        external: externalTooltip,
      },
    },
    scales: {
      x: {
        grid: { color: colors.grid },
        ticks: { color: colors.ticks },
      },
      y: {
        grid: { color: colors.grid },
        ticks: {
          color: colors.ticksY,
          callback: (v) => `${v}M`,
        },
      },
    },
  };

  return (
    <div className={`rounded-lg p-4 ${themeStyles.card} ${themeStyles.text} ${themeStyles.border} theme-transition`}>
      <div className={`text-sm ${themeStyles.muted} mb-3`}>
        Revenue • <span className="font-semibold">Current Week $58,211</span> • <span className="font-semibold">Previous Week $68,768</span>
      </div>

      <div style={{ height }}>
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
}
