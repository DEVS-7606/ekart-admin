export interface IPaymentMethod {
  code: string;
  name: string;
  methodType: string; // e.g. UPI, Card, NetBanking, Wallet, COD
  provider?: string; // e.g. Razorpay, PayU
  supportsOnline: boolean;
  supportsCod: boolean;
  transactionFeePercent?: number;
  fixedFee?: number;
  settlementDays?: number;
  isActive: boolean;
  description?: string;
}
