export interface UpdateOrderDataDTO {
  name?: string;
}

export interface UpdateOrderWhereDTO {
  orderId: string;
}

export interface UpdateOrderDTO {
  data: UpdateOrderDataDTO;
  where: UpdateOrderWhereDTO;
}
