export interface UpdateTagDataDTO {
  name?: string;
}

export interface UpdateTagWhereDTO {
  tagId: string;
}

export interface UpdateTagDTO {
  data: UpdateTagDataDTO;
  where: UpdateTagWhereDTO;
}
