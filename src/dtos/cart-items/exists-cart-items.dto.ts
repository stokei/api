export interface ExistsCartItemsWhereDTO {
  parent?: string;
  price?: string;
}

export interface ExistsCartItemsDTO {
  where: ExistsCartItemsWhereDTO;
}
