export interface RemoveVideoWhereDTO {
  removedBy: string;
  videoId: string;
}

export interface RemoveVideoDTO {
  where: RemoveVideoWhereDTO;
}
