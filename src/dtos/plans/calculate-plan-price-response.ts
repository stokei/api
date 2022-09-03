import { CurrencyModel } from '@/models/currency.model';

export interface CalculatePlanPriceResponse {
  currency: CurrencyModel;
  totalPriceAmount: number;
  applicationFeePercentage: number;
}
