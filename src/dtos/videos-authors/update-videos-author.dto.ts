export interface UpdateVideosAuthorDataDTO {
  name?: string;
}

export interface UpdateVideosAuthorWhereDTO {
  videosAuthorId: string;
}

export interface UpdateVideosAuthorDTO {
  data: UpdateVideosAuthorDataDTO;
  where: UpdateVideosAuthorWhereDTO;
}
