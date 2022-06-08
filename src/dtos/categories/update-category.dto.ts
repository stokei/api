export interface UpdateCategoryDataDTO {
  name?: string;
}

export interface UpdateCategoryWhereDTO {
  categoryId: string;
}

export interface UpdateCategoryDTO {
  data: UpdateCategoryDataDTO;
  where: UpdateCategoryWhereDTO;
}
