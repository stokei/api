export interface UpdateMetatagDataDTO {
  name?: string;
}

export interface UpdateMetatagWhereDTO {
  metatagId: string;
}

export interface UpdateMetatagDTO {
  data: UpdateMetatagDataDTO;
  where: UpdateMetatagWhereDTO;
}
