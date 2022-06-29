export interface RemoveCurrencyWhereDTO {
  removedBy: string;
  currencyId: string;
}

export interface RemoveCurrencyDTO {
  where: RemoveCurrencyWhereDTO;
}
