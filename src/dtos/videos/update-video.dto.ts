export interface UpdateVideoDataDTO {
  name?: string;
  file?: string;
  duration?: number;
  description?: string;
  poster?: string;
  private?: boolean;
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
