export interface UpdateOrdersAddressDataDTO {
  name?: string;
}

export interface UpdateOrdersAddressWhereDTO {
  ordersAddressId: string;
}

export interface UpdateOrdersAddressDTO {
  data: UpdateOrdersAddressDataDTO;
  where: UpdateOrdersAddressWhereDTO;
}
