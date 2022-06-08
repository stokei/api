export interface UpdateFileDataDTO {
  name?: string;
}

export interface UpdateFileWhereDTO {
  fileId: string;
}

export interface UpdateFileDTO {
  data: UpdateFileDataDTO;
  where: UpdateFileWhereDTO;
}
