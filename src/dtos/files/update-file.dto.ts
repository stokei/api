export interface UpdateFileDataDTO {
  duration?: number;
  updatedBy: string;
}

export interface UpdateFileWhereDTO {
  app: string;
  file: string;
}

export interface UpdateFileDTO {
  data: UpdateFileDataDTO;
  where: UpdateFileWhereDTO;
}
