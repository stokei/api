export interface RemoveVideoAuthorWhereDTO {
  removedBy: string;
  videoAuthorId: string;
}

export interface RemoveVideoAuthorDTO {
  where: RemoveVideoAuthorWhereDTO;
}
