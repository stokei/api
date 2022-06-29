export interface UpdateOrdersItemDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdateOrdersItemWhereDTO {
  ordersItemId: string;
}

export interface UpdateOrdersItemDTO {
  data: UpdateOrdersItemDataDTO;
  where: UpdateOrdersItemWhereDTO;
}
