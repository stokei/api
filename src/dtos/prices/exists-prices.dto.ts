export interface ExistsPricesWhereDTO {
  parent?: string;
  default?: boolean;
}

export interface ExistsPricesDTO {
  where: ExistsPricesWhereDTO;
}
