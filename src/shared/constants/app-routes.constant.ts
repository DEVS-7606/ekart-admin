import type { ReactElement } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Home as HomeIcon,
  Users,
  Globe,
  Bell,
  Shield,
  Languages,
  Map,
  Building2,
  Package,
  Store,
  Truck,
  CreditCard,
  Percent,
} from "lucide-react";

import Home from "@/pages/home";
import CustomerMaster from "@/pages/customer-master";
import UsersPage from "@/pages/userMaster";
import NotificationHistory from "@/pages/notificationHistory";
import RoleMaster from "@/pages/roleMaster";
import LanguageMaster from "@/pages/languageMaster";
import CountryMaster from "@/pages/countryMaster";
import StateMaster from "@/pages/stateMaster";
import CityMaster from "@/pages/cityMaster";
import Categories from "@/pages/categories";
import Brands from "@/pages/brands";
import Suppliers from "@/pages/suppliers";
import CustomerGroups from "@/pages/customer-groups";
import TaxRates from "@/pages/tax-rates";
import ShippingMethods from "@/pages/shipping-methods";
import PaymentMethods from "@/pages/payment-methods";
import Discounts from "@/pages/discounts";

export interface AppRouteConfig {
  key: string;
  path: string;
  label: string;
  icon: LucideIcon;
  component?: () => ReactElement;
  showInSidebar: boolean;
}

export const APP_ROUTES: AppRouteConfig[] = [
  {
    key: "home",
    path: "/home",
    label: "Home",
    icon: HomeIcon,
    component: Home,
    showInSidebar: true,
  },

  {
    key: "notificationHistory",
    path: "/notification-history",
    label: "Notification History",
    icon: Bell,
    component: NotificationHistory,
    showInSidebar: true,
  },
  {
    key: "language",
    path: "/language-master",
    label: "Language",
    icon: Languages,
    component: LanguageMaster,
    showInSidebar: true,
  },
  {
    key: "country",
    path: "/country-master",
    label: "Country",
    icon: Globe,
    component: CountryMaster,
    showInSidebar: true,
  },
  {
    key: "state",
    path: "/state-master",
    label: "State",
    icon: Map,
    component: StateMaster,
    showInSidebar: true,
  },
  {
    key: "city",
    path: "/city-master",
    label: "City",
    icon: Building2,
    component: CityMaster,
    showInSidebar: true,
  },
  {
    key: "categories",
    path: "/categories",
    label: "Categories",
    icon: Package,
    component: Categories,
    showInSidebar: true,
  },
  {
    key: "brands",
    path: "/brands",
    label: "Brands",
    icon: Store,
    component: Brands,
    showInSidebar: true,
  },
  {
    key: "suppliers",
    path: "/suppliers",
    label: "Suppliers",
    icon: Truck,
    component: Suppliers,
    showInSidebar: true,
  },
  {
    key: "customer-groups",
    path: "/customer-groups",
    label: "Customer Groups",
    icon: Users,
    component: CustomerGroups,
    showInSidebar: true,
  },
  {
    key: "tax-rates",
    path: "/tax-rates",
    label: "Tax Rates",
    icon: Percent,
    component: TaxRates,
    showInSidebar: true,
  },
  {
    key: "shipping-methods",
    path: "/shipping-methods",
    label: "Shipping Methods",
    icon: Truck,
    component: ShippingMethods,
    showInSidebar: true,
  },
  {
    key: "payment-methods",
    path: "/payment-methods",
    label: "Payment Methods",
    icon: CreditCard,
    component: PaymentMethods,
    showInSidebar: true,
  },
  {
    key: "discounts",
    path: "/discounts",
    label: "Discounts",
    icon: Percent,
    component: Discounts,
    showInSidebar: true,
  },
  {
    key: "customer",
    path: "/customer-master",
    label: "Customer",
    icon: Users,
    component: CustomerMaster,
    showInSidebar: true,
  },
  {
    key: "users",
    path: "/users-master",
    label: "Users",
    icon: Users,
    component: UsersPage,
    showInSidebar: true,
  },
  {
    key: "roles",
    path: "/role-master",
    label: "Roles",
    icon: Shield,
    component: RoleMaster,
    showInSidebar: true,
  },
];
