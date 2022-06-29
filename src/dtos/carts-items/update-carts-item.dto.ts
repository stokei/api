export interface UpdateCartsItemDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdateCartsItemWhereDTO {
  cartsItemId: string;
}

export interface UpdateCartsItemDTO {
  data: UpdateCartsItemDataDTO;
  where: UpdateCartsItemWhereDTO;
}
