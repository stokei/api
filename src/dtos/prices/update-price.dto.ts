export interface UpdatePriceDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdatePriceWhereDTO {
  priceId: string;
}

export interface UpdatePriceDTO {
  data: UpdatePriceDataDTO;
  where: UpdatePriceWhereDTO;
}
