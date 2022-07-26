export interface RemoveVideoWhereDTO {
  removedBy: string;
  app: string;
  videoId: string;
}

export interface RemoveVideoDTO {
  where: RemoveVideoWhereDTO;
}
