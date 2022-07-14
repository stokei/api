export interface RemoveColorWhereDTO {
  removedBy: string;
  parent: string;
  colorId: string;
}

export interface RemoveColorDTO {
  where: RemoveColorWhereDTO;
}
