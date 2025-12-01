export type DiscountType = "percentage" | "fixed" | "bogo" | "free_shipping";

export interface IDiscount {
  code: string;
  name: string;
  type: DiscountType;
  value: number; // percentage or fixed amount depending on type
  minOrderValue?: number;
  maxDiscountValue?: number;
  startDate?: string; // ISO date
  endDate?: string;
  maxRedemptions?: number;
  perCustomerLimit?: number;
  isActive: boolean;
  description?: string;
}
