export interface RemoveCartsItemWhereDTO {
  removedBy: string;
  cartsItemId: string;
}

export interface RemoveCartsItemDTO {
  where: RemoveCartsItemWhereDTO;
}
