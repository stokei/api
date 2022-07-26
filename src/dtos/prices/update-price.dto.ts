export interface UpdatePriceDataDTO {
  default?: boolean;
  quantity?: number;
  updatedBy: string;
  app: string;
}

export interface UpdatePriceWhereDTO {
  priceId: string;
}

export interface UpdatePriceDTO {
  data: UpdatePriceDataDTO;
  where: UpdatePriceWhereDTO;
}
