import { AccountRole } from '@/enums/account-role.enum';

export interface UpdateAccountDataDTO {
  updatedBy: string;
  firstname?: string;
  lastname?: string;
  avatar?: string;
  stripeCustomer?: string;
  roles?: AccountRole[];
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
