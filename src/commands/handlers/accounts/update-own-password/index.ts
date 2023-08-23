import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';
import { v4 as uuid } from 'uuid';

import { UpdateOwnPasswordCommand } from '@/commands/implements/accounts/update-own-password.command';
import {
  AccountNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAccountByIdRepository } from '@/repositories/accounts/find-account-by-id';
import { UpdateCodeForgotPasswordRepository } from '@/repositories/accounts/update-code-forgot-password';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

type UpdateOwnPasswordCommandKeys = keyof UpdateOwnPasswordCommand;

@CommandHandler(UpdateOwnPasswordCommand)
export class UpdateOwnPasswordCommandHandler
  implements ICommandHandler<UpdateOwnPasswordCommand>
{
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService,
    private readonly findAccountByIdRepository: FindAccountByIdRepository,
    private readonly updateCodeForgotPasswordRepository: UpdateCodeForgotPasswordRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateOwnPasswordCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.app) {
      throw new ParamNotFoundException<UpdateOwnPasswordCommandKeys>('app');
    }
    if (!data.account) {
      throw new ParamNotFoundException<UpdateOwnPasswordCommandKeys>('account');
    }

    const account = await this.findAccountByIdService.execute(data.account);
    if (!account) {
      throw new AccountNotFoundException();
    }

    const accountId = splitServiceId(account.id)?.id;
    const code = uuid();
    const updated = await this.updateCodeForgotPasswordRepository.execute({
      account: accountId,
      code
    });
    if (!updated) {
      throw new AccountNotFoundException();
    }

    const accountUpdated =
      await this.findAccountByIdRepository.execute(accountId);
    if (!accountUpdated) {
      throw new AccountNotFoundException();
    }
    const accountModel = this.publisher.mergeObjectContext(accountUpdated);
    accountModel.updatedOwnPasswordCreated();
    accountModel.commit();

    return updated;
  }

  private clearData(
    command: UpdateOwnPasswordCommand
  ): UpdateOwnPasswordCommand {
    return cleanObject({
      app: cleanValue(command?.app),
      account: cleanValue(command?.account)
    });
  }
}
