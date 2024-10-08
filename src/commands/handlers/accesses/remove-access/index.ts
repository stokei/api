import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  convertToISODateString,
  splitServiceId
} from '@stokei/nestjs';

import { RemoveAccessCommand } from '@/commands/implements/accesses/remove-access.command';
import {
  AccessNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAccessByIdRepository } from '@/repositories/accesses/find-access-by-id';
import { RemoveAccessRepository } from '@/repositories/accesses/remove-access';

@CommandHandler(RemoveAccessCommand)
export class RemoveAccessCommandHandler
  implements ICommandHandler<RemoveAccessCommand>
{
  constructor(
    private readonly findAccessByIdRepository: FindAccessByIdRepository,
    private readonly removeAccessRepository: RemoveAccessRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveAccessCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const accessId = splitServiceId(data.where?.access)?.id;
    const accountId = data.where?.account;

    if (!accessId) {
      throw new ParamNotFoundException('accessId');
    }
    if (!accountId) {
      throw new ParamNotFoundException('accountId');
    }

    const access = await this.findAccessByIdRepository.execute(accessId);
    if (!access || !access.active) {
      throw new AccessNotFoundException();
    }
    if (access.parent !== accountId) {
      throw new UnauthorizedException();
    }

    const removed = await this.removeAccessRepository.execute({
      where: {
        access: accessId
      },
      data: {
        active: false,
        updatedBy: accountId,
        expiresIn: convertToISODateString(Date.now()),
        canceledAt: convertToISODateString(Date.now())
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const accessModel = this.publisher.mergeObjectContext(access);
    accessModel.removedAccess({
      removedBy: data.where.removedBy
    });
    accessModel.commit();

    return access;
  }

  private clearData(command: RemoveAccessCommand): RemoveAccessCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        account: cleanValue(command?.where?.account),
        access: cleanValue(command?.where?.access)
      })
    });
  }
}
