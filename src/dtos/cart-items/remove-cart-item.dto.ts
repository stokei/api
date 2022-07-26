export interface RemoveCartItemWhereDTO {
  removedBy: string;
  app: string;
  cartItemId: string;
}

export interface RemoveCartItemDTO {
  where: RemoveCartItemWhereDTO;
}
