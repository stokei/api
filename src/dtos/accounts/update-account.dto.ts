export interface UpdateAccountDataDTO {
  updatedBy: string;
  firstname?: string;
  lastname?: string;
  avatar?: string;
  stripeCustomer?: string;
  pagarmeCustomer?: string;
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
