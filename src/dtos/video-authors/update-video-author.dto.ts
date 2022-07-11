export interface UpdateVideoAuthorDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdateVideoAuthorWhereDTO {
  videoAuthorId: string;
}

export interface UpdateVideoAuthorDTO {
  data: UpdateVideoAuthorDataDTO;
  where: UpdateVideoAuthorWhereDTO;
}
