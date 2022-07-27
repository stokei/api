export interface RemoveColorWhereDTO {
  removedBy: string;
  app: string;
  parent: string;
  color: string;
}

export interface RemoveColorDTO {
  where: RemoveColorWhereDTO;
}
