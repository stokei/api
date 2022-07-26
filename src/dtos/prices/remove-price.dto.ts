export interface RemovePriceWhereDTO {
  removedBy: string;
  app: string;
  priceId: string;
}

export interface RemovePriceDTO {
  where: RemovePriceWhereDTO;
}
