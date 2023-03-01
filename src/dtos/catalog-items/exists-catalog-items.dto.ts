export interface ExistsCatalogItemsWhereDTO {
  catalog?: string;
  instructor?: string;
}

export interface ExistsCatalogItemsDTO {
  where: ExistsCatalogItemsWhereDTO;
}
