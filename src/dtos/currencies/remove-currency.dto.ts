export interface RemoveCurrencyWhereDTO {
  removedBy: string;
  currency: string;
}

export interface RemoveCurrencyDTO {
  where: RemoveCurrencyWhereDTO;
}
