export interface ExistsCatalogItemsWhereDTO {
  catalog?: string;
  product?: string;
}

export interface ExistsCatalogItemsDTO {
  where: ExistsCatalogItemsWhereDTO;
}
