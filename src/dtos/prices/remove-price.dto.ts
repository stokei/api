export interface RemovePriceWhereDTO {
  removedBy: string;
  priceId: string;
}

export interface RemovePriceDTO {
  where: RemovePriceWhereDTO;
}
