export interface RemoveImageWhereDTO {
  removedBy: string;
  app: string;
  imageId: string;
}

export interface RemoveImageDTO {
  where: RemoveImageWhereDTO;
}
