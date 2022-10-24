export interface UpdatePriceTierDataDTO {
  amount: number;
  upTo?: number;
  infinite: boolean;
  updatedBy: string;
}

export interface UpdatePriceTierWhereDTO {
  app: string;
  priceTier: string;
}

export interface UpdatePriceTierDTO {
  data: UpdatePriceTierDataDTO;
  where: UpdatePriceTierWhereDTO;
}
