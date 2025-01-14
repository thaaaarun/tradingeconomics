"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/card"

interface ComparisonChartProps {
  data: Array<{ year: number; [key: string]: number | null }>
  countryA: string
  countryB: string
  indicator: string
}

const CustomTooltip = ({ active, payload, label, indicator }: any) => {
  if (!active || !payload) return null;

  return (
    <Card className="bg-white p-2 shadow-lg border border-gray-200 text-sm w-48 z-10">
      <div className="font-medium">Year: {label}</div>
      {payload.map((entry: any, index: number) => {
        const value = entry.value === null || entry.value === undefined ? "Null" : entry.value.toFixed(2);

        return (
          <div key={index} className="flex justify-between">
            <span style={{ color: entry.color }}>{entry.name}:</span>
            <span>{value}</span>
          </div>
        );
      })}
    </Card>
  );
};

export default function ComparisonChart({ data, countryA, countryB, indicator }: ComparisonChartProps) {
  return (
    <div className="w-full h-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip content={<CustomTooltip indicator={indicator} />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey={countryA} 
            stroke="hsl(200, 100%, 50%)"
            name={countryA} 
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey={countryB} 
            stroke="hsl(300, 100%, 50%)"
            name={countryB} 
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
