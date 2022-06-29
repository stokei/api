export interface UpdateCartDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdateCartWhereDTO {
  cartId: string;
}

export interface UpdateCartDTO {
  data: UpdateCartDataDTO;
  where: UpdateCartWhereDTO;
}
