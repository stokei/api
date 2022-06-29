export interface RemoveImageWhereDTO {
  removedBy: string;
  imageId: string;
}

export interface RemoveImageDTO {
  where: RemoveImageWhereDTO;
}
