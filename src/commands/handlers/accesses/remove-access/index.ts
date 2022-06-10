import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

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
    const accessId = splitServiceId(data.where?.accessId)?.id;
    const accountId = data.where?.accountId;
    if (!accessId) {
      throw new ParamNotFoundException('accessId');
    }
    if (!accountId) {
      throw new ParamNotFoundException('accountId');
    }

    const access = await this.findAccessByIdRepository.execute(accessId);
    if (!access) {
      throw new AccessNotFoundException();
    }
    if (access.parent !== accountId) {
      throw new UnauthorizedException();
    }

    const removed = await this.removeAccessRepository.execute({
      where: {
        accessId,
        accountId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const accessModel = this.publisher.mergeObjectContext(access);
    accessModel.removedAccess();
    accessModel.commit();

    return access;
  }

  private clearData(command: RemoveAccessCommand): RemoveAccessCommand {
    return cleanObject({
      where: cleanObject({
        accessId: cleanValue(command?.where?.accessId)
      })
    });
  }
}
