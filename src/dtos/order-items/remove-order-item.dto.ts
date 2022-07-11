export interface RemoveOrderItemWhereDTO {
  removedBy: string;
  orderItemId: string;
}

export interface RemoveOrderItemDTO {
  where: RemoveOrderItemWhereDTO;
}
