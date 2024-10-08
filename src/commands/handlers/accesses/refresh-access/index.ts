import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  ManagementTokenService,
  splitServiceId
} from '@stokei/nestjs';

import { RefreshAccessCommand } from '@/commands/implements/accesses/refresh-access.command';
import {
  AccessNotFoundException,
  AccountNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAccessByIdRepository } from '@/repositories/accesses/find-access-by-id';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@CommandHandler(RefreshAccessCommand)
export class RefreshAccessCommandHandler
  implements ICommandHandler<RefreshAccessCommand>
{
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService,
    private readonly findAccessByIdRepository: FindAccessByIdRepository,
    private readonly managementTokenService: ManagementTokenService
  ) {}

  async execute(command: RefreshAccessCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }

    if (!data.where?.access) {
      throw new ParamNotFoundException('accessId');
    }
    if (!data.where?.account) {
      throw new ParamNotFoundException('accountId');
    }
    const account = await this.findAccountByIdService.execute(
      data.where?.account
    );
    if (!account) {
      throw new AccountNotFoundException();
    }
    const accessId = splitServiceId(data.where?.access)?.id;
    const access = await this.findAccessByIdRepository.execute(accessId);
    if (!access || access.parent !== account.id) {
      throw new AccessNotFoundException();
    }
    if (!access.active) {
      throw new UnauthorizedException();
    }

    const accessToken = this.managementTokenService.createAccessToken({
      id: account.id,
      code: access.id,
      firstname: account.firstname,
      lastname: account.lastname,
      email: account.email,
      avatar: account.avatar,
      accessExpiresIn: access.expiresIn
    });

    const refreshToken = this.managementTokenService.createRefreshToken({
      code: access.id,
      accountId: account.id,
      accessExpiresIn: access.expiresIn
    });
    access.prefixToken = 'Bearer';
    access.accessToken = accessToken;
    access.refreshToken = refreshToken;
    return {
      account,
      prefixToken: access.prefixToken,
      accessToken: access.accessToken,
      refreshToken: access.refreshToken
    };
  }

  private clearData(command: RefreshAccessCommand): RefreshAccessCommand {
    return cleanObject({
      where: cleanObject({
        access: cleanValue(command?.where?.access),
        account: cleanValue(command?.where?.account)
      })
    });
  }
}
