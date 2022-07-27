export interface RemoveCurrencyWhereDTO {
  removedBy: string;
  app: string;
  currency: string;
}

export interface RemoveCurrencyDTO {
  where: RemoveCurrencyWhereDTO;
}
