export interface UpdateVersionDataDTO {
  name?: string;
  updatedBy: string;
}

export interface UpdateVersionWhereDTO {
  app: string;
  version: string;
}

export interface UpdateVersionDTO {
  data: UpdateVersionDataDTO;
  where: UpdateVersionWhereDTO;
}
