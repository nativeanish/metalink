import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { CustomTooltipProps, LinkPerformanceData } from "./types";

interface PerformanceChartProps {
  data: LinkPerformanceData[];
  title: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <p className="font-bold">{label}</p>
        <p className="text-blue-600">Views: {payload[0].value}</p>
        <p className="text-green-600">Clicks: {payload[1].value}</p>
      </div>
    );
  }
  return null;
};

export function PerformanceChart({ data, title }: PerformanceChartProps) {
  return (
    <div className="lg:col-span-2 bg-white border-4 border-gray-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-2">Page Performance</h2>
      <p className="text-gray-600 mb-4">View performance for {title}</p>
      <div className="h-[300px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="views"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ stroke: "#3b82f6", strokeWidth: 2 }}
              activeDot={{ r: 8 }}
              name="Views"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="clicks"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ stroke: "#10b981", strokeWidth: 2 }}
              activeDot={{ r: 8 }}
              name="Clicks"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
