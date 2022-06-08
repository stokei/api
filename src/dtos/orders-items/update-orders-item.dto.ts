export interface UpdateOrdersItemDataDTO {
  name?: string;
}

export interface UpdateOrdersItemWhereDTO {
  ordersItemId: string;
}

export interface UpdateOrdersItemDTO {
  data: UpdateOrdersItemDataDTO;
  where: UpdateOrdersItemWhereDTO;
}
