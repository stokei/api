export interface RemoveCartWhereDTO {
  removedBy: string;
  cartId: string;
}

export interface RemoveCartDTO {
  where: RemoveCartWhereDTO;
}
