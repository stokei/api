import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanUsername,
  cleanValue,
  encryptPassword
} from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { CreateAccountCommand } from '@/commands/implements/accounts/create-account.command';
import { AccountStatus } from '@/enums/account-status.enum';
import { PASSWORD_SECRET_KEY } from '@/environments';
import {
  AccountAlreadyExistsException,
  AccountNotFoundException,
  AccountUsernameAlreadyExistsException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateAccountRepository } from '@/repositories/accounts/create-account';
import { ExistsAccountsRepository } from '@/repositories/accounts/exists-accounts';

type CreateAccountCommandKeys = keyof CreateAccountCommand;

@CommandHandler(CreateAccountCommand)
export class CreateAccountCommandHandler
  implements ICommandHandler<CreateAccountCommand>
{
  constructor(
    private readonly createAccountRepository: CreateAccountRepository,
    private readonly existsAccountsRepository: ExistsAccountsRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateAccountCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.app) {
      throw new ParamNotFoundException<CreateAccountCommandKeys>('app');
    }
    if (!data.firstname) {
      throw new ParamNotFoundException<CreateAccountCommandKeys>('firstname');
    }
    if (!data.lastname) {
      throw new ParamNotFoundException<CreateAccountCommandKeys>('lastname');
    }
    if (!data.email) {
      throw new ParamNotFoundException<CreateAccountCommandKeys>('email');
    }
    if (!data.password) {
      throw new ParamNotFoundException<CreateAccountCommandKeys>('password');
    }

    data.password = encryptPassword({
      password: data.password,
      secretKey: PASSWORD_SECRET_KEY
    });

    let accountExists = await this.existsAccountsRepository.execute({
      where: {
        email: data.email,
        app: data.app
      }
    });
    if (accountExists) {
      throw new AccountAlreadyExistsException();
    }
    const username = cleanUsername(data.firstname + data.lastname + nanoid(14));
    accountExists = await this.existsAccountsRepository.execute({
      where: {
        username
      }
    });
    if (accountExists) {
      throw new AccountUsernameAlreadyExistsException();
    }

    const accountCreated = await this.createAccountRepository.execute({
      ...data,
      username,
      status: AccountStatus.ACTIVE
    });
    if (!accountCreated) {
      throw new AccountNotFoundException();
    }

    const accountModel = this.publisher.mergeObjectContext(accountCreated);
    accountModel.createdAccount({
      createdBy: data.createdBy
    });
    accountModel.commit();

    return accountCreated;
  }

  private clearData(command: CreateAccountCommand): CreateAccountCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      id: cleanValue(command?.id),
      app: cleanValue(command?.app),
      firstname: cleanValue(command?.firstname),
      lastname: cleanValue(command?.lastname),
      email: cleanValue(command?.email),
      password: cleanValue(command?.password)
    });
  }
}
