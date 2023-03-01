export interface UpdateCatalogDataDTO {
  updatedBy: string;
  title?: string;
  subtitle?: string;
}

export interface UpdateCatalogWhereDTO {
  app: string;
  catalog: string;
}

export interface UpdateCatalogDTO {
  data: UpdateCatalogDataDTO;
  where: UpdateCatalogWhereDTO;
}
