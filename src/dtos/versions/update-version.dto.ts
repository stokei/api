export interface UpdateVersionDataDTO {
  name?: string;
}

export interface UpdateVersionWhereDTO {
  versionId: string;
}

export interface UpdateVersionDTO {
  data: UpdateVersionDataDTO;
  where: UpdateVersionWhereDTO;
}
