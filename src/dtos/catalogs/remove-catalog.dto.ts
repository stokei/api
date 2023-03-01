export interface RemoveCatalogWhereDTO {
  removedBy: string;
  catalog: string;
}

export interface RemoveCatalogDTO {
  where: RemoveCatalogWhereDTO;
}
