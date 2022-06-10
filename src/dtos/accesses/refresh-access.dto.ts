export interface RefreshAccessWhereDTO {
  accessId: string;
  accountId: string;
}

export interface RefreshAccessDTO {
  where: RefreshAccessWhereDTO;
}
