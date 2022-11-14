export interface UpdateFileDataDTO {
  filename?: string;
  extension?: string;
  mimetype?: string;
  size?: number;
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
