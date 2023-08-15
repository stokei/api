export interface RemoveOrderWhereDTO {
  removedBy: string;
  app: string;
  order: string;
}

export interface RemoveOrderDTO {
  where: RemoveOrderWhereDTO;
}
