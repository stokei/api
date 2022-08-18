export interface UpdatePriceDataDTO {
  default?: boolean;
  fromPrice?: number;
  purchaseUrl?: string;
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
