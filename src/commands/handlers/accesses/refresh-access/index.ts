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
import { FindAccountByIdRepository } from '@/repositories/accounts/find-account-by-id';

@CommandHandler(RefreshAccessCommand)
export class RefreshAccessCommandHandler
  implements ICommandHandler<RefreshAccessCommand>
{
  constructor(
    private readonly findAccountByIdRepository: FindAccountByIdRepository,
    private readonly findAccessByIdRepository: FindAccessByIdRepository,
    private readonly managementTokenService: ManagementTokenService
  ) {}

  async execute(command: RefreshAccessCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const accessId = splitServiceId(data.where?.accessId)?.id;
    const accountId = splitServiceId(data.where?.accountId)?.id;
    if (!accessId) {
      throw new ParamNotFoundException('accessId');
    }
    if (!accountId) {
      throw new ParamNotFoundException('accountId');
    }
    const account = await this.findAccountByIdRepository.execute(accountId);
    if (!account) {
      throw new AccountNotFoundException();
    }
    const access = await this.findAccessByIdRepository.execute(accessId);
    if (!access || !access.active || access.parent !== account.id) {
      throw new AccessNotFoundException();
    }

    const accessUpdated = await this.findAccessByIdRepository.execute(accessId);
    if (!accessUpdated) {
      throw new AccessNotFoundException();
    }
    const accessToken = this.managementTokenService.createAccessToken({
      id: account.id,
      code: accessUpdated.id,
      firstname: account.firstname,
      lastname: account.lastname,
      email: account.email,
      avatar: account.avatar,
      accessExpiresIn: accessUpdated.expiresIn
    });

    const refreshToken = this.managementTokenService.createRefreshToken({
      code: accessUpdated.id,
      accountId: account.id,
      accessExpiresIn: accessUpdated.expiresIn
    });
    accessUpdated.accessToken = accessToken;
    accessUpdated.refreshToken = refreshToken;
    return {
      account,
      accessToken: accessUpdated.accessToken,
      refreshToken: accessUpdated.refreshToken
    };
  }

  private clearData(command: RefreshAccessCommand): RefreshAccessCommand {
    return cleanObject({
      where: cleanObject({
        accessId: cleanValue(command?.where?.accessId),
        accountId: cleanValue(command?.where?.accountId)
      })
    });
  }
}
