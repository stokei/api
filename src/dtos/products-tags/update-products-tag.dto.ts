export interface UpdateProductsTagDataDTO {
  name?: string;
}

export interface UpdateProductsTagWhereDTO {
  productsTagId: string;
}

export interface UpdateProductsTagDTO {
  data: UpdateProductsTagDataDTO;
  where: UpdateProductsTagWhereDTO;
}
