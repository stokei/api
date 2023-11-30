import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';
import { v4 as uuid } from 'uuid';

import { ForgotPasswordCommand } from '@/commands/implements/accounts/forgot-password.command';
import {
  AccountNotFoundException,
  DataNotFoundException,
  ErrorUpdatingForgotPasswordCodeException,
  ParamNotFoundException
} from '@/errors';
import { FindAccountByEmailAndAppRepository } from '@/repositories/accounts/find-account-by-email-and-app';
import { FindAccountByIdRepository } from '@/repositories/accounts/find-account-by-id';
import { UpdateCodeForgotPasswordRepository } from '@/repositories/accounts/update-code-forgot-password';

type ForgotPasswordCommandKeys = keyof ForgotPasswordCommand;

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordCommandHandler
  implements ICommandHandler<ForgotPasswordCommand>
{
  constructor(
    private readonly findAccountByEmailAndAppRepository: FindAccountByEmailAndAppRepository,
    private readonly findAccountByIdRepository: FindAccountByIdRepository,
    private readonly updateCodeForgotPasswordRepository: UpdateCodeForgotPasswordRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: ForgotPasswordCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.app) {
      throw new ParamNotFoundException<ForgotPasswordCommandKeys>('app');
    }
    if (!data.email) {
      throw new ParamNotFoundException<ForgotPasswordCommandKeys>('email');
    }

    const account = await this.findAccountByEmailAndAppRepository.execute({
      email: data.email,
      app: data.app
    });
    if (!account) {
      throw new ErrorUpdatingForgotPasswordCodeException();
    }

    const accountId = splitServiceId(account.id)?.id;
    const code = uuid();
    const updated = await this.updateCodeForgotPasswordRepository.execute({
      account: accountId,
      code
    });
    if (!updated) {
      throw new ErrorUpdatingForgotPasswordCodeException();
    }

    const accountUpdated =
      await this.findAccountByIdRepository.execute(accountId);
    if (!accountUpdated) {
      throw new AccountNotFoundException();
    }
    const accountModel = this.publisher.mergeObjectContext(accountUpdated);
    accountModel.forgottenPassword();
    accountModel.commit();

    return updated;
  }

  private clearData(command: ForgotPasswordCommand): ForgotPasswordCommand {
    return cleanObject({
      app: cleanValue(command?.app),
      email: cleanValue(command?.email)
    });
  }
}
