import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, comparePassword } from '@stokei/nestjs';

import { CreateAccessCommand } from '@/commands/implements/accesses/create-access.command';
import { LoginCommand } from '@/commands/implements/accounts/login.command';
import { defaultAppId } from '@/constants/default-app-id';
import { roleName } from '@/constants/role-name';
import { AccountStatus } from '@/enums/account-status.enum';
import { PASSWORD_SECRET_KEY } from '@/environments';
import {
  AccessNotFoundException,
  AppNotFoundException,
  DataNotFoundException,
  InvalidEmailOrPasswordException,
  ParamNotFoundException
} from '@/errors';
import { AccessModel } from '@/models/access.model';
import { FindAccountByEmailAndAppRepository } from '@/repositories/accounts/find-account-by-email-and-app';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindAllRolesService } from '@/services/roles/find-all-roles';

type LoginCommandKeys = keyof LoginCommand;

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly findAccountByEmailAndAppRepository: FindAccountByEmailAndAppRepository,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findAllRolesService: FindAllRolesService
  ) {}

  async execute(command: LoginCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.app) {
      throw new ParamNotFoundException<LoginCommandKeys>('app');
    }
    if (!data.email) {
      throw new ParamNotFoundException<LoginCommandKeys>('email');
    }
    if (!data.password) {
      throw new ParamNotFoundException<LoginCommandKeys>('password');
    }

    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }

    let account = await this.findAccountByEmailAndAppRepository.execute({
      email: data.email,
      app: data.app
    });
    if (!account) {
      account = await this.findAccountByEmailAndAppRepository.execute({
        email: data.email,
        app: defaultAppId
      });
      if (account) {
        const isAppOwner = app.parent === account.id;
        if (!isAppOwner) {
          const accountRoles = await this.findAllRolesService.execute({
            where: {
              AND: {
                parent: {
                  equals: account.id
                },
                app: {
                  equals: defaultAppId
                },
                name: {
                  equals: roleName.ADMIN
                }
              }
            }
          });
          const isAppAdmin = !!accountRoles.totalCount;
          if (!isAppAdmin) {
            throw new InvalidEmailOrPasswordException();
          }
        }
      }
    }
    if (!account || !account?.active) {
      throw new InvalidEmailOrPasswordException();
    }
    const isValidPassword =
      account.status === AccountStatus.CONFIGURATION_PENDING ||
      comparePassword({
        textPassword: data.password,
        encryptedPassword: account.password,
        secretKey: PASSWORD_SECRET_KEY
      });
    if (!isValidPassword) {
      throw new InvalidEmailOrPasswordException();
    }
    const accessCreated: AccessModel = await this.commandBus.execute(
      new CreateAccessCommand({
        parent: account.id,
        app: data.app,
        createdBy: account.id
      })
    );
    if (!accessCreated) {
      throw new AccessNotFoundException();
    }
    return {
      account: account,
      prefixToken: accessCreated.prefixToken,
      accessToken: accessCreated.accessToken,
      refreshToken: accessCreated.refreshToken
    };
  }

  private clearData(command: LoginCommand): LoginCommand {
    return cleanObject({
      app: cleanValue(command?.app),
      email: cleanValue(command?.email),
      password: cleanValue(command?.password)
    });
  }
}
