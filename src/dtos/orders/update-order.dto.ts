export interface UpdateOrderDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdateOrderWhereDTO {
  orderId: string;
}

export interface UpdateOrderDTO {
  data: UpdateOrderDataDTO;
  where: UpdateOrderWhereDTO;
}
