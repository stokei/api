import { ICommand } from '@nestjs/cqrs';

import { CompleteAccountConfigurationDTO } from '@/dtos/accounts/complete-account-configuration.dto';

export class CompleteAccountConfigurationCommand
  implements ICommand, CompleteAccountConfigurationDTO
{
  password: string;
  app: string;
  account: string;

  constructor(data: CompleteAccountConfigurationDTO) {
    this.password = data?.password;
    this.account = data?.account;
    this.app = data?.app;
  }
}
