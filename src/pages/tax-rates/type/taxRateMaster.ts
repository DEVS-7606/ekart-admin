export interface ITaxRate {
  code: string;
  name: string;
  country?: string;
  state?: string;
  city?: string;
  taxType?: string; // e.g. GST, VAT
  ratePercent: number;
  isInclusive?: boolean;
  isActive: boolean;
  description?: string;
}
