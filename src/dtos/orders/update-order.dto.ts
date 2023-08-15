export interface UpdateOrderDataDTO {
  updatedBy: string;
  paidAmount?: number;
  totalAmount?: number;
  subtotalAmount?: number;
  feeAmount?: number;
}

export interface UpdateOrderWhereDTO {
  app: string;
  order: string;
}

export interface UpdateOrderDTO {
  data: UpdateOrderDataDTO;
  where: UpdateOrderWhereDTO;
}
