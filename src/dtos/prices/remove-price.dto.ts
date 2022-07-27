export interface RemovePriceWhereDTO {
  removedBy: string;
  app: string;
  price: string;
}

export interface RemovePriceDTO {
  where: RemovePriceWhereDTO;
}
