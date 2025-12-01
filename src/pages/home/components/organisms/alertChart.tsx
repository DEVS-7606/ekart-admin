import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/shared/components/atoms/card";
import { Typography } from "@/shared/components/atoms/Typography";
import { SelectField } from "@/shared/components/molecules/selectDropdown";

export interface AlertData {
  machine: string;
  critical: number;
  major: number;
  minor: number;
  warning: number;
}

export interface AlertChartProps {
  data: AlertData[];
  title?: string;
  height?: number;
}

type SeverityLevel = "critical" | "major" | "minor" | "warning";

const severityOptions = [
  { label: "Critical", value: "critical" },
  { label: "Major", value: "major" },
  { label: "Minor", value: "minor" },
  { label: "Warning", value: "warning" },
];

const severityColors = {
  critical: "hsl(244.5205 57.9365% 50.5882%)",
  major: "hsl(244.5205 57.9365% 50.5882%)",
  minor: "hsl(243.6522 54.5024% 41.3725%)",
  warning: "hsl(243.3962 75.3555% 58.6275%)",
};

const severityLabels = {
  critical: "Critical Alerts",
  major: "Major Alerts",
  minor: "Minor Alerts",
  warning: "Warning Alerts",
};

export const AlertChart = ({
  data,
  title = "Top Machines by Alerts",
  height = 400,
}: AlertChartProps) => {
  const [selectedSeverity, setSelectedSeverity] =
    useState<SeverityLevel>("major");

  return (
    <Card className="border-0 bg-white shadow-sm">
      <CardContent className="p-0">
        <div
          className="h-1"
          style={{ backgroundColor: "hsl(0 84.2365% 60.1961%)" }}
        />

        <div className="p-6">
          <CardHeader className="p-0 mb-6">
            <div className="flex items-center justify-between gap-4">
              <Typography
                component="h3"
                variant="lg"
                weight="semiBold"
                className="text-gray-700 uppercase tracking-wide"
              >
                {title}
              </Typography>
              <div className="w-48">
                <SelectField
                  placeholder="Select severity"
                  options={severityOptions}
                  value={selectedSeverity}
                  onChange={(val) => setSelectedSeverity(val as SeverityLevel)}
                />
              </div>
            </div>
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
                  value: "Alert Count",
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
              <Bar
                dataKey={selectedSeverity}
                fill={severityColors[selectedSeverity]}
                name={severityLabels[selectedSeverity]}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
