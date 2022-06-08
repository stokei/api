export interface UpdateVideosSubtitleDataDTO {
  name?: string;
}

export interface UpdateVideosSubtitleWhereDTO {
  videosSubtitleId: string;
}

export interface UpdateVideosSubtitleDTO {
  data: UpdateVideosSubtitleDataDTO;
  where: UpdateVideosSubtitleWhereDTO;
}
