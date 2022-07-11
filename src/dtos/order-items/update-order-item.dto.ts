export interface UpdateOrderItemDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdateOrderItemWhereDTO {
  orderItemId: string;
}

export interface UpdateOrderItemDTO {
  data: UpdateOrderItemDataDTO;
  where: UpdateOrderItemWhereDTO;
}
