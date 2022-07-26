export interface UpdateVideoDataDTO {
  name: string;
  description?: string;
  poster?: string;
  updatedBy: string;
  app: string;
}

export interface UpdateVideoWhereDTO {
  videoId: string;
}

export interface UpdateVideoDTO {
  data: UpdateVideoDataDTO;
  where: UpdateVideoWhereDTO;
}
