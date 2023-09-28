export interface UpdatePageDataDTO {
  title?: string;
  version?: string;
  slug?: string;
  draftVersion?: string;
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
