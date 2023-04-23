export interface RemovePriceTierWhereDTO {
  removedBy: string;
  app: string;
  priceTier: string;
}

export interface RemovePriceTierDTO {
  where: RemovePriceTierWhereDTO;
}
