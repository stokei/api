import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateAccessCommand } from '@/commands/implements/accesses/create-access.command';
import { CreateAccountCommand } from '@/commands/implements/accounts/create-account.command';
import { SignUpCommand } from '@/commands/implements/accounts/signup.command';
import {
  AccessNotFoundException,
  AccountNotFoundException,
  DataNotFoundException
} from '@/errors';
import { AccessModel } from '@/models/access.model';
import { AccountModel } from '@/models/account.model';

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
  constructor(private readonly commandBus: CommandBus) {}

  async execute(command: SignUpCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const accountCreated: AccountModel = await this.commandBus.execute(
      new CreateAccountCommand({
        ...data,
        createdBy: data.app
      })
    );
    if (!accountCreated) {
      throw new AccountNotFoundException();
    }
    const accessCreated: AccessModel = await this.commandBus.execute(
      new CreateAccessCommand({
        parent: accountCreated.id,
        app: data.app,
        createdBy: accountCreated.id
      })
    );
    if (!accessCreated) {
      throw new AccessNotFoundException();
    }

    return {
      account: accountCreated,
      prefixToken: accessCreated.prefixToken,
      accessToken: accessCreated.accessToken,
      refreshToken: accessCreated.refreshToken
    };
  }

  private clearData(command: SignUpCommand): SignUpCommand {
    return cleanObject({
      firstname: cleanValue(command?.firstname),
      lastname: cleanValue(command?.lastname),
      app: cleanValue(command?.app),
      email: cleanValue(command?.email),
      password: cleanValue(command?.password)
    });
  }
}
