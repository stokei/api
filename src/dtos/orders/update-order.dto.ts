export interface UpdateOrderDataDTO {
  updatedBy: string;
  name?: string;
  description?: string;
}

export interface UpdateOrderWhereDTO {
  app: string;
  order: string;
}

export interface UpdateOrderDTO {
  data: UpdateOrderDataDTO;
  where: UpdateOrderWhereDTO;
}
