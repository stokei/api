import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, comparePassword } from '@stokei/nestjs';

import { CreateAccessCommand } from '@/commands/implements/accesses/create-access.command';
import { LoginCommand } from '@/commands/implements/accounts/login.command';
import { PASSWORD_SECRET_KEY } from '@/environments';
import {
  AccessNotFoundException,
  DataNotFoundException,
  InvalidEmailOrPasswordException,
  ParamNotFoundException
} from '@/errors';
import { AccessModel } from '@/models/access.model';
import { FindAccountByEmailAndParentRepository } from '@/repositories/accounts/find-account-by-email-and-parent';

type LoginCommandKeys = keyof LoginCommand;

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly findAccountByEmailAndParentRepository: FindAccountByEmailAndParentRepository
  ) {}

  async execute(command: LoginCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.parent) {
      throw new ParamNotFoundException<LoginCommandKeys>('parent');
    }
    if (!data.email) {
      throw new ParamNotFoundException<LoginCommandKeys>('email');
    }
    if (!data.password) {
      throw new ParamNotFoundException<LoginCommandKeys>('password');
    }

    const account = await this.findAccountByEmailAndParentRepository.execute({
      email: data.email,
      parent: data.parent
    });
    if (!account || !account?.active) {
      throw new InvalidEmailOrPasswordException();
    }
    const isValidPassword = comparePassword(
      data.password,
      account.password,
      account.salt,
      PASSWORD_SECRET_KEY
    );
    if (!isValidPassword) {
      throw new InvalidEmailOrPasswordException();
    }
    const accessCreated: AccessModel = await this.commandBus.execute(
      new CreateAccessCommand({
        parent: account.id,
        createdBy: account.id
      })
    );
    if (!accessCreated) {
      throw new AccessNotFoundException();
    }
    return {
      account: account,
      accessToken: accessCreated.accessToken,
      refreshToken: accessCreated.refreshToken
    };
  }

  private clearData(command: LoginCommand): LoginCommand {
    return cleanObject({
      parent: cleanValue(command?.parent),
      email: cleanValue(command?.email),
      password: cleanValue(command?.password)
    });
  }
}
