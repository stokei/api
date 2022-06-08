export interface UpdateProductDataDTO {
  name?: string;
}

export interface UpdateProductWhereDTO {
  productId: string;
}

export interface UpdateProductDTO {
  data: UpdateProductDataDTO;
  where: UpdateProductWhereDTO;
}
