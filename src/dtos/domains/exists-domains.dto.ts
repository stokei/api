export interface ExistsDomainsWhereDTO {
  parent?: string;
  fulldomain?: string;
}

export interface ExistsDomainsDTO {
  where: ExistsDomainsWhereDTO;
}
