export interface UpdateVideosTagDataDTO {
  name?: string;
}

export interface UpdateVideosTagWhereDTO {
  videosTagId: string;
}

export interface UpdateVideosTagDTO {
  data: UpdateVideosTagDataDTO;
  where: UpdateVideosTagWhereDTO;
}
