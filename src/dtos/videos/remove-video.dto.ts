export interface RemoveVideoWhereDTO {
  removedBy: string;
  app: string;
  video: string;
}

export interface RemoveVideoDTO {
  where: RemoveVideoWhereDTO;
}
