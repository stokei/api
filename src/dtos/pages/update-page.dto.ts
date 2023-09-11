export interface UpdatePageDataDTO {
  title?: string;
  updatedBy: string;
}

export interface UpdatePageWhereDTO {
  app: string;
  page: string;
}

export interface UpdatePageDTO {
  data: UpdatePageDataDTO;
  where: UpdatePageWhereDTO;
}
