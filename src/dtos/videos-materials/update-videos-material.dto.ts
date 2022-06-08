export interface UpdateVideosMaterialDataDTO {
  name?: string;
}

export interface UpdateVideosMaterialWhereDTO {
  videosMaterialId: string;
}

export interface UpdateVideosMaterialDTO {
  data: UpdateVideosMaterialDataDTO;
  where: UpdateVideosMaterialWhereDTO;
}
