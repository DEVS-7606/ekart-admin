export interface ISupplier {
  code: string;
  name: string;
  contactName?: string;
  phone?: string;
  email?: string;
  country?: string;
  city?: string;
  leadTimeDays?: number;
  minOrderValue?: number;
  paymentTerms?: string;
  isActive: boolean;
  description?: string;
}
