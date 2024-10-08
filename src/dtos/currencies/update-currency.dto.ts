export interface UpdateCurrencyDataDTO {
  updatedBy: string;
  name?: string;
  symbol?: string;
  minorUnit?: number;
}

export interface UpdateCurrencyWhereDTO {
  currency: string;
}

export interface UpdateCurrencyDTO {
  data: UpdateCurrencyDataDTO;
  where: UpdateCurrencyWhereDTO;
}
