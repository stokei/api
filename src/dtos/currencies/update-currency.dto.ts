export interface UpdateCurrencyDataDTO {
  updatedBy: string;
  name?: string;
  symbol?: string;
  minorUnit?: number;
}

export interface UpdateCurrencyWhereDTO {
  app: string;
  currency: string;
}

export interface UpdateCurrencyDTO {
  data: UpdateCurrencyDataDTO;
  where: UpdateCurrencyWhereDTO;
}
