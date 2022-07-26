export interface RemoveColorWhereDTO {
  removedBy: string;
  app: string;
  parent: string;
  colorId: string;
}

export interface RemoveColorDTO {
  where: RemoveColorWhereDTO;
}
