export interface RemoveOrderItemWhereDTO {
  removedBy: string;
  app: string;
  orderItem: string;
}

export interface RemoveOrderItemDTO {
  where: RemoveOrderItemWhereDTO;
}
