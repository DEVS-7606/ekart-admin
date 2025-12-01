import { Activity, AlertTriangle, Bell, Power } from "lucide-react";
import { Typography } from "@/shared/components/atoms/Typography";
import { MetricCard } from "./components/molecules/metricCard";
import { ProductionChart } from "./components/organisms/productionChart";
import { AlertChart } from "./components/organisms/alertChart";
import {
  MOCK_ALERT_DATA,
  MOCK_PRODUCTION_DATA,
  MOCK_METRICS,
} from "./constants/homeData.constant";

const Home = () => {
  const metrics = MOCK_METRICS.map((metric, index) => {
    const icons = [Activity, Power, AlertTriangle, Bell, Bell, Bell];
    return {
      ...metric,
      icon: icons[index],
    };
  });

  return (
    <div className="min-h-full bg-gray-50">
      <div className="p-6 space-y-6">
        {/* Header */}
        <Typography
          component="h1"
          variant="3xl"
          weight="bold"
          className="text-gray-900 tracking-tight"
        >
          Welcome, E-commerce Admin!
        </Typography>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              icon={metric.icon}
              variant={metric.variant}
            />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductionChart
            data={MOCK_PRODUCTION_DATA}
            title="Top Categories by Revenue vs Target"
            height={450}
          />
          <AlertChart
            data={MOCK_ALERT_DATA}
            title="Order Issues by Category (Refunds / Cancellations / Returns)"
            height={450}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
