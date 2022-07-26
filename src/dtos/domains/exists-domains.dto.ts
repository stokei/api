export interface ExistsDomainsWhereDTO {
  parent?: string;
  name?: string;
}

export interface ExistsDomainsDTO {
  where: ExistsDomainsWhereDTO;
}
