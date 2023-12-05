export interface UpdatePriceDataDTO {
  fromAmount?: number;
  amount?: number;
  quantity?: number;
  automaticRenew?: boolean;
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
