export interface UpdatePriceDataDTO {
  fromPrice?: number;
  quantity?: number;
  updatedBy: string;
}

export interface UpdatePriceWhereDTO {
  app: string;
  price: string;
}

export interface UpdatePriceDTO {
  data: UpdatePriceDataDTO;
  where: UpdatePriceWhereDTO;
}
