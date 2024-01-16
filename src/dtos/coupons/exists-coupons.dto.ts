export interface ExistsCouponsWhereDTO {
  app: string;
  parent: string;
  code: string;
}

export interface ExistsCouponsDTO {
  where: ExistsCouponsWhereDTO;
}
