export interface RemoveOrdersItemWhereDTO {
  removedBy: string;
  ordersItemId: string;
}

export interface RemoveOrdersItemDTO {
  where: RemoveOrdersItemWhereDTO;
}
