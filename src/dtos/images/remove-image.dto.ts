export interface RemoveImageWhereDTO {
  removedBy: string;
  app: string;
  image: string;
}

export interface RemoveImageDTO {
  where: RemoveImageWhereDTO;
}
