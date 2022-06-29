export interface UpdateCurrencyDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdateCurrencyWhereDTO {
  currencyId: string;
}

export interface UpdateCurrencyDTO {
  data: UpdateCurrencyDataDTO;
  where: UpdateCurrencyWhereDTO;
}
