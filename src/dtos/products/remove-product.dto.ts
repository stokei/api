export interface RemoveProductWhereDTO {
  removedBy: string;
  productId: string;
}

export interface RemoveProductDTO {
  where: RemoveProductWhereDTO;
}
