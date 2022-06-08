import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AccountRole } from '@/enums/account-role.enum';
import { AccountStatus } from '@/enums/account-status.enum';
import { CreateAccountCommand } from '@/commands/implements/accounts/create-account.command';
import {
  AccountAlreadyExistsException,
  AccountNotFoundException,
  AccountUsernameAlreadyExistsException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateAccountRepository } from '@/repositories/accounts/create-account';
import {
  cleanObject,
  cleanUsername,
  cleanValue,
  encryptPassword,
  generateSalt
} from '@stokei/nestjs';
import { PASSWORD_SECRET_KEY } from '@/environments';
import { ExistsAccountsRepository } from '@/repositories/accounts/exists-accounts';
import { nanoid } from 'nanoid';

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

    const salt = await generateSalt(PASSWORD_SECRET_KEY);
    data.password = encryptPassword(data.password, salt, PASSWORD_SECRET_KEY);

    let accountExists = await this.existsAccountsRepository.execute({
      where: {
        email: data.email,
        parent: data.parent
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
      salt,
      status: AccountStatus.ACTIVE,
      roles: [AccountRole.USER]
    });
    if (!accountCreated) {
      throw new AccountNotFoundException();
    }

    const accountModel = this.publisher.mergeObjectContext(accountCreated);
    accountModel.createdAccount();
    accountModel.commit();

    return accountCreated;
  }

  private clearData(command: CreateAccountCommand): CreateAccountCommand {
    return cleanObject({
      firstname: cleanValue(command?.firstname),
      lastname: cleanValue(command?.lastname),
      parent: cleanValue(command?.parent),
      email: cleanValue(command?.email),
      password: cleanValue(command?.password)
    });
  }
}
