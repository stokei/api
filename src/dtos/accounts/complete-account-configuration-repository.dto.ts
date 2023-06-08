import { CompleteAccountConfigurationDTO } from '@/dtos/accounts/complete-account-configuration.dto';
import { AccountStatus } from '@/enums/account-status.enum';

export interface CompleteAccountConfigurationRepositoryDTO
  extends CompleteAccountConfigurationDTO {
  status: AccountStatus;
}
