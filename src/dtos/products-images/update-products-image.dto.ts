export interface UpdateProductsImageDataDTO {
  name?: string;
}

export interface UpdateProductsImageWhereDTO {
  productsImageId: string;
}

export interface UpdateProductsImageDTO {
  data: UpdateProductsImageDataDTO;
  where: UpdateProductsImageWhereDTO;
}
