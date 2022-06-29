export interface UpdateVideosAuthorDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdateVideosAuthorWhereDTO {
  videosAuthorId: string;
}

export interface UpdateVideosAuthorDTO {
  data: UpdateVideosAuthorDataDTO;
  where: UpdateVideosAuthorWhereDTO;
}
