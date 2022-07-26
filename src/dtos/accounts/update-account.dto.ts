export interface UpdateAccountDataDTO {
  updatedBy: string;
  app: string;
  name?: string;
}

export interface UpdateAccountWhereDTO {
  accountId: string;
}

export interface UpdateAccountDTO {
  data: UpdateAccountDataDTO;
  where: UpdateAccountWhereDTO;
}
