export interface ExistsAppsWhereDTO {
  parent?: string;
  slug?: string;
}

export interface ExistsAppsDTO {
  where: ExistsAppsWhereDTO;
}
