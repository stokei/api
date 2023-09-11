export interface UpdatePageDataDTO {
  name?: string;
  slug?: string;
  favicon?: string;
  logo?: string;
  homePage?: string;
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
