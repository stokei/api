import { CreateAccountDTO } from '@/dtos/accounts/create-account.dto';
import { AccountRole } from '@/enums/account-role.enum';
import { AccountStatus } from '@/enums/account-status.enum';

export interface CreateAccountRepositoryDTO extends CreateAccountDTO {
  username: string;
  salt: string;
  status: AccountStatus;
  roles: AccountRole[];
}
