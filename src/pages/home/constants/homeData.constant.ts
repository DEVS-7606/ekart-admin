import type { AlertData } from "../components/organisms/alertChart";
import type { ProductionData } from "../components/organisms/productionChart";

export const MOCK_ALERT_DATA: AlertData[] = [
  {
    machine: "Electronics",
    critical: 18, // refunds
    major: 24, // cancellations
    minor: 32, // returns
    warning: 12, // COD rejections
  },
  {
    machine: "Fashion",
    critical: 10,
    major: 18,
    minor: 28,
    warning: 14,
  },
  {
    machine: "Home & Kitchen",
    critical: 6,
    major: 10,
    minor: 18,
    warning: 9,
  },
  {
    machine: "Mobiles",
    critical: 14,
    major: 20,
    minor: 26,
    warning: 11,
  },
  {
    machine: "Accessories",
    critical: 4,
    major: 9,
    minor: 15,
    warning: 7,
  },
  {
    machine: "Grocery",
    critical: 3,
    major: 6,
    minor: 12,
    warning: 5,
  },
  {
    machine: "Beauty & Personal Care",
    critical: 5,
    major: 8,
    minor: 14,
    warning: 6,
  },
  {
    machine: "Sports & Fitness",
    critical: 2,
    major: 5,
    minor: 9,
    warning: 4,
  },
];

export const MOCK_PRODUCTION_DATA: ProductionData[] = [
  { machine: "Electronics", production: 145000, target: 160000 },
  { machine: "Mobiles", production: 98000, target: 110000 },
  { machine: "Laptops", production: 76000, target: 90000 },
  { machine: "Fashion", production: 88000, target: 95000 },
  { machine: "Home & Kitchen", production: 64000, target: 75000 },
  { machine: "Grocery", production: 42000, target: 50000 },
  { machine: "Beauty & Personal Care", production: 39000, target: 45000 },
  { machine: "Sports & Fitness", production: 28000, target: 35000 },
  { machine: "Books", production: 12000, target: 15000 },
  { machine: "Toys", production: 15000, target: 20000 },
];

export const MOCK_METRICS = [
  {
    title: "Today's Orders",
    value: 128,
    variant: "success" as const,
  },
  {
    title: "Today's Revenue",
    value: "₹ 3.45L",
    variant: "success" as const,
  },
  {
    title: "Pending Orders",
    value: 23,
    variant: "warning" as const,
  },
  {
    title: "Orders in Transit",
    value: 57,
    variant: "default" as const,
  },
  {
    title: "Open Refund Requests",
    value: 5,
    variant: "critical" as const,
  },
  {
    title: "Returning Customers Rate",
    value: "32%",
    variant: "success" as const,
  },
];
