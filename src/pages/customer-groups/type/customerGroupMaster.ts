export interface ICustomerGroup {
  code: string;
  name: string;
  groupType?: string; // e.g. Retail, Wholesale, VIP, B2B
  discountPercent?: number;
  minOrderValue?: number;
  isDefault?: boolean;
  isActive: boolean;
  description?: string;
}
