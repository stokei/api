export interface ExistsProjectsWhereDTO {
  parent?: string;
  slug?: string;
}

export interface ExistsProjectsDTO {
  where: ExistsProjectsWhereDTO;
}
