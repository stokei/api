export interface UpdateAccountDataDTO {
  updatedBy: string;
  firstname?: string;
  lastname?: string;
  avatar?: string;
  dateBirthday?: string;
}

export interface UpdateAccountWhereDTO {
  app: string;
  account: string;
}

export interface UpdateAccountDTO {
  data: UpdateAccountDataDTO;
  where: UpdateAccountWhereDTO;
}
