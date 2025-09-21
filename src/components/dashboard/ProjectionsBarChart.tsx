// components/ProjectionsBarChart.tsx
"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

export default function ProjectionsBarChart({
  height = 220,
  actual = [12, 18, 15, 22, 17, 21],
  projection = [14, 21, 18, 24, 20, 23],
}: {
  height?: number;
  actual?: number[];
  projection?: number[];
}) {
  // compute the "cap" as projection - actual (clamped at 0)
  const diff = projection.map((p, i) => Math.max(0, p - (actual[i] ?? 0)));

  const data = {
    labels: months,
    datasets: [
      {
        // base = actual
        label: "Actual",
        data: actual,
        backgroundColor: "rgba(59,130,246,0.22)", // base color (soft)
        borderRadius: 0,
        barThickness: 10,
        categoryPercentage: 0.6,
        barPercentage: 0.9,
        stack: "stackA",
      },
      {
        // cap = projection - actual (stacked on top)
        label: "Projection Cap",
        data: diff,
        backgroundColor: "rgba(59,130,246,0.48)", // stronger/lighter cap
        borderRadius: 0,
        borderSkipped: false, // allow rounded top on stacked segment
        barThickness: 10,
        categoryPercentage: 0.6,
        barPercentage: 0.9,
        stack: "stackA",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        padding: 8,
        backgroundColor: "#111827",
        titleColor: "#fff",
        bodyColor: "#fff",
        mode: "index",
        intersect: false,
      },
    },
    layout: {
      padding: { top: 6, bottom: 6 },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6b7280" },
      },
      y: {
        stacked: true, // enable stacking so cap sits on top of base
        grid: {
          color: "rgba(15,23,42,0.05)",
        },
        suggestedMax: 30,
        ticks: {
          stepSize: 10,
          color: "#9CA3AF",
          callback: (val) => `${val}M`,
        },
      },
    },
  };

  return (
    <div className=" bg-white rounded-lg p-4 shadow-sm">
      <div className="text-sm text-gray-500 mb-3">Projections vs Actuals</div>
      <div className="h-48">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
