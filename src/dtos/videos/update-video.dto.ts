export interface UpdateVideoDataDTO {
  name: string;
  description?: string;
  poster?: string;
  updatedBy: string;
}

export interface UpdateVideoWhereDTO {
  app: string;
  video: string;
}

export interface UpdateVideoDTO {
  data: UpdateVideoDataDTO;
  where: UpdateVideoWhereDTO;
}
