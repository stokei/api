export interface UpdateCurrencyDataDTO {
  name?: string;
}

export interface UpdateCurrencyWhereDTO {
  currencyId: string;
}

export interface UpdateCurrencyDTO {
  data: UpdateCurrencyDataDTO;
  where: UpdateCurrencyWhereDTO;
}
