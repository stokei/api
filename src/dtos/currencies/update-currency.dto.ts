export interface UpdateCurrencyDataDTO {
  updatedBy: string;
  app: string;
  name?: string;
  symbol?: string;
  minorUnit?: number;
}

export interface UpdateCurrencyWhereDTO {
  currencyId: string;
}

export interface UpdateCurrencyDTO {
  data: UpdateCurrencyDataDTO;
  where: UpdateCurrencyWhereDTO;
}
