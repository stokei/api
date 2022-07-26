export interface RemoveVideoAuthorWhereDTO {
  removedBy: string;
  app: string;
  video: string;
  author: string;
}

export interface RemoveVideoAuthorDTO {
  where: RemoveVideoAuthorWhereDTO;
}
