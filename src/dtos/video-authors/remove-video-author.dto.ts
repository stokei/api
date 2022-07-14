export interface RemoveVideoAuthorWhereDTO {
  removedBy: string;
  video: string;
  author: string;
}

export interface RemoveVideoAuthorDTO {
  where: RemoveVideoAuthorWhereDTO;
}
