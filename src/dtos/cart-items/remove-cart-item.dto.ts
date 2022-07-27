export interface RemoveCartItemWhereDTO {
  removedBy: string;
  app: string;
  cartItem: string;
}

export interface RemoveCartItemDTO {
  where: RemoveCartItemWhereDTO;
}
