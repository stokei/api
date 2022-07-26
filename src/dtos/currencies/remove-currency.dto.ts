export interface RemoveCurrencyWhereDTO {
  removedBy: string;
  app: string;
  currencyId: string;
}

export interface RemoveCurrencyDTO {
  where: RemoveCurrencyWhereDTO;
}
