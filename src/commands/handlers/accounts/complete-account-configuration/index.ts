import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  encryptPassword,
  splitServiceId
} from '@stokei/nestjs';

import { CompleteAccountConfigurationCommand } from '@/commands/implements/accounts/complete-account-configuration.command';
import { AccountStatus } from '@/enums/account-status.enum';
import { PASSWORD_SECRET_KEY } from '@/environments';
import {
  AccountAlreadyExistsException,
  AccountNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CompleteAccountConfigurationRepository } from '@/repositories/accounts/complete-account-configuration';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { LoginService } from '@/services/accounts/login';

@CommandHandler(CompleteAccountConfigurationCommand)
export class CompleteAccountConfigurationCommandHandler
  implements ICommandHandler<CompleteAccountConfigurationCommand>
{
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService,
    private readonly loginService: LoginService,
    private readonly completeAccountConfigurationRepository: CompleteAccountConfigurationRepository
  ) {}

  async execute(command: CompleteAccountConfigurationCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.account) {
      throw new ParamNotFoundException('account');
    }
    if (!data?.app) {
      throw new ParamNotFoundException('app');
    }

    const account = await this.findAccountByIdService.execute(data.account);
    if (!account && account?.app !== data.app) {
      throw new AccountNotFoundException();
    }
    if (account.status !== AccountStatus.CONFIGURATION_PENDING) {
      throw new AccountAlreadyExistsException();
    }
    const accountUpdated =
      await this.completeAccountConfigurationRepository.execute({
        password: encryptPassword({
          password: data.password,
          secretKey: PASSWORD_SECRET_KEY
        }),
        account: splitServiceId(account.id)?.id,
        app: data.app,
        status: AccountStatus.ACTIVE
      });
    if (!accountUpdated) {
      throw new AccountNotFoundException();
    }
    return await this.loginService.execute({
      app: data.app,
      email: account.email,
      password: data.password
    });
  }

  private clearData(
    command: CompleteAccountConfigurationCommand
  ): CompleteAccountConfigurationCommand {
    return cleanObject({
      app: cleanValue(command?.app),
      password: cleanValue(command?.password),
      account: cleanValue(command?.account)
    });
  }
}
