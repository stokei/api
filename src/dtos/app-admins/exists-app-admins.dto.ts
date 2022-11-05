export interface ExistsAppAdminsWhereDTO {
  app?: string;
  admin?: string;
}

export interface ExistsAppAdminsDTO {
  where: ExistsAppAdminsWhereDTO;
}
