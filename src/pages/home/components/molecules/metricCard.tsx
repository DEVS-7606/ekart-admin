import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/shared/components/atoms/card";
import { Typography } from "@/shared/components/atoms/Typography";

export interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  variant?: "default" | "warning" | "critical" | "success";
}

const variantStyles = {
  default: {
    accent: "bg-gray-900",
    textColor: "text-gray-900",
  },
  warning: {
    accent: "bg-amber-500",
    textColor: "text-amber-900",
  },
  critical: {
    accent: "bg-rose-500",
    textColor: "text-rose-900",
  },
  success: {
    accent: "bg-emerald-500",
    textColor: "text-emerald-900",
  },
};

export const MetricCard = ({
  title,
  value,
  icon: Icon,
  variant = "default",
}: MetricCardProps) => {
  const styles = variantStyles[variant];

  return (
    <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-0">
        {/* Colored accent bar */}
        <div className={`h-1 ${styles.accent}`} />

        <div className="p-6 space-y-3">
          {/* Icon and Title Row */}
          <div className="flex items-start justify-between h-10">
            <Typography
              component="p"
              variant="sm"
              weight="medium"
              className="text-gray-500 uppercase tracking-wider"
            >
              {title}
            </Typography>
            {Icon && (
              <Icon className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
            )}
          </div>

          {/* Value */}
          <Typography
            component="h3"
            variant="5xl"
            weight="bold"
            className={`${styles.textColor} tracking-tight`}
          >
            {value}
          </Typography>

          {/* Description */}
        </div>
      </CardContent>
    </Card>
  );
};
