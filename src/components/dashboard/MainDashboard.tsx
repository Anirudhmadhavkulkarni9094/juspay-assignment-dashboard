// components/MainDashboard.tsx
"use client";

import React from "react";
import ProjectionsBarChart from "./ProjectionsBarChart";
import RevenueLineChart from "./RevenueLineChart";
import RevenueByLocation from "./RevenueByLocation";
import SegmentedDonut from "./SegmentedDonut";
import { useTheme } from "@/context/ThemeContext";
import { TrendingDown, TrendingUp } from "lucide-react";

function MetricCard({ title, value, delta, index }: { title: string; value: string; delta?: string, index: number }) {
    const { theme } = useTheme();

    return (
        <div className={`rounded-2xl min-w-fit flex justify-between items-center shadow-sm p-4 h-32 ${theme === 'dark' ? (index === 0 || index === 3) ? "bg-blue-200 text-black" : "bg-gray-600 text-white" : (index == 0 || index == 3) ? "bg-gray-200 text-black" : "bg-white text-black"}`}>
           <div >
            <div className="text-lg font-bold ">{title}</div>
            <div className="mt-2 text-2xl font-semibold ">{value}</div>
           </div>
            {delta && <div className={`text-md ${parseFloat(delta) < 0 ? "text-red-500" : "text-green-500"} mt-1 flex items-center`}>{delta}%{parseFloat(delta) < 0 ? <TrendingDown/> : <TrendingUp className="w-4 h-4" aria-hidden="true" />}
</div>}
        </div>
    );
}

function ChartSkeleton() {
    return <div className="h-56 bg-gray-50 rounded border border-dashed animate-pulse" />;
}

export default function MainDashboard() {
    const metrics = [
        { title: "Customers", value: "3,781", delta: "11.01" },
        { title: "Orders", value: "1,219", delta: "-0.03" },
        { title: "Revenue", value: "$695", delta: "6.03" },
        { title: "Growth", value: "30.1%", delta: "6.00" },
    ];

    const products = [
        { name: "ASOS Ridley High Waist", price: "$79.49", qty: 82, amount: "$6,518.18" },
        { name: "Marco Lightweight Shirt", price: "$19.25", qty: 37, amount: "$3,711.50" },
        { name: "Half Sleeve Shirt", price: "$25.00", qty: 64, amount: "$1,600.00" },
        { name: "Bright Jacket", price: "$110.00", qty: 14, amount: "$1,540.00" },
    ];
    const { theme, themeStyles } = useTheme();

    return (
        <>
            <div className={`${themeStyles.background}`}>
                <div className="w-full  p-5">
                    <div className="flex justify-between items-start gap-4">
                        {/* Metrics area — grows to fill available width */}
                        <div className="flex-1">
                            {/* responsive grid: 1 col on xs, 2 on sm, 4 on lg */}
                            <div className="grid grid-cols-2 gap-4">
                                {metrics.map((m, i) => (
                                    <MetricCard index={i} key={m.title} title={m.title} value={m.value} delta={m.delta} />
                                ))}
                            </div>
                        </div>
                        {/* Projections card — fixed size on md+ and hidden on small screens (you can change behavior) */}
                        <div className="hidden md:flex md:flex-shrink-0 md:items-start">
                            <div className=" rounded-md p-2 shadow-none">
                                <React.Suspense fallback={<ChartSkeleton />}>
                                    <ProjectionsBarChart />
                                </React.Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex  gap-6 p-5">
                {/* Left: Revenue Line Chart expands */}
                <div className="flex-1 min-w-0">
                    <div className="h-full  rounded-2xl">
                        <React.Suspense fallback={<ChartSkeleton />}>
                            <RevenueLineChart height={300} />
                        </React.Suspense>
                    </div>
                </div>

                {/* Right: Revenue by Location fixed width */}
                <div className="">
                    <div className="h-full bg-gray-100 rounded-2xl">
                        <React.Suspense fallback={<ChartSkeleton />}>
                            <RevenueByLocation />
                        </React.Suspense>
                    </div>
                </div>
            </div>
            <div>
                <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 ${themeStyles.text}`}>
                    <div className="lg:col-span-2 rounded-lg shadow-sm p-4">
                        <div className="text-md font-bold  mb-3">Top Selling Products</div>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-xs ">
                                    <th className="pb-2">Name</th>
                                    <th className="pb-2">Price</th>
                                    <th className="pb-2">Quantity</th>
                                    <th className="pb-2">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p) => (
                                    <tr key={p.name} className="border-t">
                                        <td className="py-3 ">{p.name}</td>
                                        <td className="py-3 ">{p.price}</td>
                                        <td className="py-3 ">{p.qty}</td>
                                        <td className="py-3 ">{p.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="rounded-lg shadow-sm p-4">
                        <div className={`text-sm font-medium ${themeStyles.text}  mb-3`}>Total Sales</div>

                        {/* Donut */}
                        <div className="flex items-center justify-center">
                            <SegmentedDonut
                                segments={[300.56, 135.18, 154.02, 48.96]} // values
                                labels={["Direct", "Affiliate", "Sponsored", "E-mail"]}
                                colors={[theme == 'dark' ? "#f08eff" : "#0f172a", "#A7F3D0", "#BFDBFE", "#CFFAFE"]}
                                size={180}
                                strokeWidth={28}
                                gapDeg={6}
                                centerLabel="38.6%"
                            />
                        </div>

                        {/* Legend */}
                        <div className="mt-6 space-y-3">
                            <div className="flex justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#0f172a]" />
                                    Direct
                                </div>
                                <span className="font-medium">$300.56</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#A7F3D0]" />
                                    Affiliate
                                </div>
                                <span className="font-medium">$135.18</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#BFDBFE]" />
                                    Sponsored
                                </div>
                                <span className="font-medium">$154.02</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#CFFAFE]" />
                                    E-mail
                                </div>
                                <span className="font-medium">$48.96</span>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <>
            </>
        </>
    )
}
