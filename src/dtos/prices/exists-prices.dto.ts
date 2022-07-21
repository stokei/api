export interface ExistsPricesWhereDTO {
  parent?: string;
  default?: string;
}

export interface ExistsPricesDTO {
  where: ExistsPricesWhereDTO;
}
