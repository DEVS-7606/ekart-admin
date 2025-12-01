import { APP_ROUTES } from "@/shared/constants/app-routes.constant";

export const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
];

export const navigationItems = APP_ROUTES.filter(
  (route) => route.showInSidebar
).map((route) => ({
  icon: route.icon,
  label: route.label,
  href: route.path,
}));
