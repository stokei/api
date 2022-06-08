export interface UpdateOrdersSellerDataDTO {
  name?: string;
}

export interface UpdateOrdersSellerWhereDTO {
  ordersSellerId: string;
}

export interface UpdateOrdersSellerDTO {
  data: UpdateOrdersSellerDataDTO;
  where: UpdateOrdersSellerWhereDTO;
}
