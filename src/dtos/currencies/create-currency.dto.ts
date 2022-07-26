export interface CreateCurrencyDTO {
  id: string;
  name: string;
  symbol: string;
  minorUnit: number;
  app: string;
  createdBy: string;
}
