export interface UpdatePageDataDTO {
  name?: string;
}

export interface UpdatePageWhereDTO {
  pageId: string;
}

export interface UpdatePageDTO {
  data: UpdatePageDataDTO;
  where: UpdatePageWhereDTO;
}
