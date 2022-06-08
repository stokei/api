export interface UpdateVideoDataDTO {
  name?: string;
}

export interface UpdateVideoWhereDTO {
  videoId: string;
}

export interface UpdateVideoDTO {
  data: UpdateVideoDataDTO;
  where: UpdateVideoWhereDTO;
}
