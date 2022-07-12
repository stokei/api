export interface RemoveCartItemWhereDTO {
  removedBy: string;
  cartItemId: string;
}

export interface RemoveCartItemDTO {
  where: RemoveCartItemWhereDTO;
}
