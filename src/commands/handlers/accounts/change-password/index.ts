import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  encryptPassword,
  splitServiceId
} from '@stokei/nestjs';

import { ChangePasswordCommand } from '@/commands/implements/accounts/change-password.command';
import { PASSWORD_SECRET_KEY } from '@/environments';
import {
  AccountNotFoundException,
  DataNotFoundException,
  ErrorUpdatingPasswordException,
  ParamNotFoundException
} from '@/errors';
import { FindAccountByEmailAndForgotPasswordCodeRepository } from '@/repositories/accounts/find-account-by-email-and-forgot-password-code';
import { FindAccountByIdRepository } from '@/repositories/accounts/find-account-by-id';
import { UpdatePasswordRepository } from '@/repositories/accounts/update-password';

type ChangePasswordCommandKeys = keyof ChangePasswordCommand;

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordCommandHandler
  implements ICommandHandler<ChangePasswordCommand>
{
  constructor(
    private readonly findAccountByIdRepository: FindAccountByIdRepository,
    private readonly findAccountByEmailAndForgotPasswordCodeRepository: FindAccountByEmailAndForgotPasswordCodeRepository,
    private readonly updatePasswordRepository: UpdatePasswordRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: ChangePasswordCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.email) {
      throw new ParamNotFoundException<ChangePasswordCommandKeys>('email');
    }
    if (!data.code) {
      throw new ParamNotFoundException<ChangePasswordCommandKeys>('code');
    }
    if (!data.password) {
      throw new ParamNotFoundException<ChangePasswordCommandKeys>('password');
    }

    const account =
      await this.findAccountByEmailAndForgotPasswordCodeRepository.execute({
        email: data.email,
        code: data.code
      });
    if (!account) {
      throw new ErrorUpdatingPasswordException();
    }

    const newPassword = await encryptPassword(
      data.password,
      account.salt,
      PASSWORD_SECRET_KEY
    );

    const accountId = splitServiceId(account.id)?.id;
    const updated = await this.updatePasswordRepository.execute({
      accountId,
      lastPassword: account.password,
      password: newPassword
    });
    if (!updated) {
      throw new ErrorUpdatingPasswordException();
    }

    const accountUpdated = await this.findAccountByIdRepository.execute(
      accountId
    );
    if (!accountUpdated) {
      throw new AccountNotFoundException();
    }
    const accountModel = this.publisher.mergeObjectContext(accountUpdated);
    accountModel.changedPassword();
    accountModel.commit();

    return updated;
  }

  private clearData(command: ChangePasswordCommand): ChangePasswordCommand {
    return cleanObject({
      code: cleanValue(command?.code),
      password: cleanValue(command?.password),
      email: cleanValue(command?.email)
    });
  }
}
