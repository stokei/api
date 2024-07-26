export interface RemoveProductComboItemWhereDTO {
  removedBy: string;
  app: string;
  parent: string;
  product: string;
}

export interface RemoveProductComboItemDTO {
  where: RemoveProductComboItemWhereDTO;
}
