import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  addDays,
  cleanObject,
  cleanValue,
  convertToISODateString,
  ManagementTokenService,
  splitServiceId
} from '@stokei/nestjs';

import { CreateAccessCommand } from '@/commands/implements/accesses/create-access.command';
import {
  AccessNotFoundException,
  AccountNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateAccessRepository } from '@/repositories/accesses/create-access';
import { FindAccountByIdRepository } from '@/repositories/accounts/find-account-by-id';

type CreateAccessCommandKeys = keyof CreateAccessCommand;

@CommandHandler(CreateAccessCommand)
export class CreateAccessCommandHandler
  implements ICommandHandler<CreateAccessCommand>
{
  constructor(
    private readonly createAccessRepository: CreateAccessRepository,
    private readonly findAccountByIdRepository: FindAccountByIdRepository,
    private readonly managementTokenService: ManagementTokenService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateAccessCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.parent) {
      throw new ParamNotFoundException<CreateAccessCommandKeys>('parent');
    }

    const account = await this.findAccountByIdRepository.execute(
      splitServiceId(data.parent)?.id
    );
    if (!account) {
      throw new AccountNotFoundException();
    }

    const accessExpiresIn = addDays(15);
    const accessCreated = await this.createAccessRepository.execute({
      ...data,
      active: true,
      expiresIn: convertToISODateString(accessExpiresIn),
      parent: account.id
    });
    if (!accessCreated) {
      throw new AccessNotFoundException();
    }
    const accessModel = this.publisher.mergeObjectContext(accessCreated);
    accessModel.createdAccess(account);
    accessModel.commit();

    const accessToken = this.managementTokenService.createAccessToken({
      id: account.id,
      code: accessCreated.id,
      firstname: account.firstname,
      lastname: account.lastname,
      email: account.email,
      avatar: account.avatar,
      accessExpiresIn: accessCreated.expiresIn
    });

    const refreshToken = this.managementTokenService.createRefreshToken({
      code: accessCreated.id,
      accountId: account.id,
      accessExpiresIn: accessCreated.expiresIn
    });
    accessCreated.accessToken = accessToken;
    accessCreated.refreshToken = refreshToken;

    return accessCreated;
  }

  private clearData(command: CreateAccessCommand): CreateAccessCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      parent: cleanValue(command?.parent)
    });
  }
}
