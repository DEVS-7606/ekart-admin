import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/shared/components/atoms/card";
import { Typography } from "@/shared/components/atoms/Typography";

export interface ProductionData {
  machine: string; // category or segment label
  production: number; // realized revenue or sales
  target: number; // target revenue or sales
  efficiency?: number;
}

export interface ProductionChartProps {
  data: ProductionData[];
  title?: string;
  height?: number;
}

export const ProductionChart = ({
  data,
  title = "Revenue by Category",
  height = 400,
}: ProductionChartProps) => {
  return (
    <Card className="border-0 bg-white shadow-sm">
      <CardContent className="p-0">
        <div
          className="h-1"
          style={{ backgroundColor: "hsl(238.7324 83.5294% 66.6667%)" }}
        />

        <div className="p-6">
          <CardHeader className="p-0 mb-6">
            <Typography
              component="h3"
              variant="lg"
              weight="semiBold"
              className="text-gray-700 uppercase tracking-wide"
            >
              {title}
            </Typography>
          </CardHeader>

          <ResponsiveContainer width="100%" height={height}>
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 40,
                left: 10,
                bottom: 20,
              }}
              barCategoryGap="20%"
              barGap={3}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="machine"
                angle={-45}
                textAnchor="end"
                height={60}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
              <YAxis
                tick={{ fill: "#6b7280", fontSize: 12 }}
                label={{
                  value: "Revenue",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: "#6b7280", fontSize: 12 },
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "12px",
                }}
                labelStyle={{ color: "#111827", fontWeight: 600 }}
              />
              <Legend wrapperStyle={{ paddingTop: "10px" }} iconType="circle" />
              <Bar
                dataKey="production"
                fill="hsl(238.7324 83.5294% 82.6667%)"
                name="Production"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="target"
                fill="hsl(243.3962 75.3555% 58.6275%)"
                name="Target"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
