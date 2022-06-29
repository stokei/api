export interface RemoveColorWhereDTO {
  removedBy: string;
  colorId: string;
}

export interface RemoveColorDTO {
  where: RemoveColorWhereDTO;
}
