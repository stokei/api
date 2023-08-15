export interface UpdateOrderItemDataDTO {
  updatedBy: string;
  name?: string;
  description?: string;
}

export interface UpdateOrderItemWhereDTO {
  app: string;
  orderItem: string;
}

export interface UpdateOrderItemDTO {
  data: UpdateOrderItemDataDTO;
  where: UpdateOrderItemWhereDTO;
}
