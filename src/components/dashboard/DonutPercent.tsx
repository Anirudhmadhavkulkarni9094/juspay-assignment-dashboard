"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutPercent({ percent = 38.6 }: { percent?: number }) {
  const remaining = Math.max(0, 100 - percent);
  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [percent, remaining],
        backgroundColor: ["#06b6d4", "#e6eef8"],
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    cutout: "70%",
    rotation: -90,
    circumference: 360,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
  };

  return (
    <div className="bg-white rounded-lg p-4 inline-flex items-center justify-center">
      <div className="relative">
        <div style={{ width: 110, height: 110 }}>
          <Doughnut data={data} options={options} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-lg font-bold text-gray-800">{percent}%</div>
        </div>
      </div>
    </div>
  );
}
