import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';
import { v4 as uuid } from 'uuid';

import { ForgotPasswordCommand } from '@/commands/implements/accounts/forgot-password.command';
import {
  AccountNotFoundException,
  DataNotFoundException,
  ErrorUpdatingForgotPasswordCodeException,
  ParamNotFoundException
} from '@/errors';
import { FindAccountByEmailAndParentRepository } from '@/repositories/accounts/find-account-by-email-and-parent';
import { FindAccountByIdRepository } from '@/repositories/accounts/find-account-by-id';
import { UpdateCodeForgotPasswordRepository } from '@/repositories/accounts/update-code-forgot-password';

type ForgotPasswordCommandKeys = keyof ForgotPasswordCommand;

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordCommandHandler
  implements ICommandHandler<ForgotPasswordCommand>
{
  constructor(
    private readonly findAccountByEmailAndParentRepository: FindAccountByEmailAndParentRepository,
    private readonly findAccountByIdRepository: FindAccountByIdRepository,
    private readonly updateCodeForgotPasswordRepository: UpdateCodeForgotPasswordRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: ForgotPasswordCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.parent) {
      throw new ParamNotFoundException<ForgotPasswordCommandKeys>('parent');
    }
    if (!data.email) {
      throw new ParamNotFoundException<ForgotPasswordCommandKeys>('email');
    }

    const account = await this.findAccountByEmailAndParentRepository.execute({
      email: data.email,
      parent: data.parent
    });
    if (!account) {
      throw new AccountNotFoundException();
    }

    const code = uuid();
    const updated = await this.updateCodeForgotPasswordRepository.execute({
      accountId: account.id,
      code
    });
    if (!updated) {
      throw new ErrorUpdatingForgotPasswordCodeException();
    }

    const accountUpdated = await this.findAccountByIdRepository.execute(
      account.id
    );
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
      parent: cleanValue(command?.parent),
      email: cleanValue(command?.email)
    });
  }
}
