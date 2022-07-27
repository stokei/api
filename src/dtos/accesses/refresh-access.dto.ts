export interface RefreshAccessWhereDTO {
  access: string;
  account: string;
}

export interface RefreshAccessDTO {
  where: RefreshAccessWhereDTO;
}
