export interface RemoveCatalogItemWhereDTO {
  removedBy: string;
  app: string;
  catalog: string;
  product: string;
}

export interface RemoveCatalogItemDTO {
  where: RemoveCatalogItemWhereDTO;
}
