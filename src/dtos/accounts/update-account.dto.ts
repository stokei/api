export interface UpdateAccountDataDTO {
  name?: string;
}

export interface UpdateAccountWhereDTO {
  accountId: string;
}

export interface UpdateAccountDTO {
  data: UpdateAccountDataDTO;
  where: UpdateAccountWhereDTO;
}
