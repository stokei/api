export interface UpdateProductsCategoryDataDTO {
  name?: string;
}

export interface UpdateProductsCategoryWhereDTO {
  productsCategoryId: string;
}

export interface UpdateProductsCategoryDTO {
  data: UpdateProductsCategoryDataDTO;
  where: UpdateProductsCategoryWhereDTO;
}
