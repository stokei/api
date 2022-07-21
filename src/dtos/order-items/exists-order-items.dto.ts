export interface ExistsOrderItemsWhereDTO {
  order?: string;
  product?: string;
}

export interface ExistsOrderItemsDTO {
  where: ExistsOrderItemsWhereDTO;
}
