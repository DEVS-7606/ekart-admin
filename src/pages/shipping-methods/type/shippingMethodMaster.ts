export interface IShippingMethod {
  code: string;
  name: string;
  carrier?: string;
  zone?: string; // e.g. National, Local, International
  baseCharge?: number;
  perKgCharge?: number;
  estimatedDaysMin?: number;
  estimatedDaysMax?: number;
  isCodSupported?: boolean;
  isActive: boolean;
  description?: string;
}
