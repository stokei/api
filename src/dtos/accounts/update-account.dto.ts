export interface UpdateAccountDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdateAccountWhereDTO {
  app: string;
  account: string;
}

export interface UpdateAccountDTO {
  data: UpdateAccountDataDTO;
  where: UpdateAccountWhereDTO;
}
