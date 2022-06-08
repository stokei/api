export interface UpdatePriceDataDTO {
  name?: string;
}

export interface UpdatePriceWhereDTO {
  priceId: string;
}

export interface UpdatePriceDTO {
  data: UpdatePriceDataDTO;
  where: UpdatePriceWhereDTO;
}
