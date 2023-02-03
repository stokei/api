export interface UpdateProductDataDTO {
  name?: string;
  defaultPrice?: string;
  description?: string;
  updatedBy: string;
}

export interface UpdateProductWhereDTO {
  app: string;
  product: string;
}

export interface UpdateProductDTO {
  data: UpdateProductDataDTO;
  where: UpdateProductWhereDTO;
}
