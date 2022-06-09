import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateAccessCommand } from '@/commands/implements/accesses/update-access.command';
import {
  AccessNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAccessByIdRepository } from '@/repositories/accesses/find-access-by-id';
import { UpdateAccessRepository } from '@/repositories/accesses/update-access';

@CommandHandler(UpdateAccessCommand)
export class UpdateAccessCommandHandler
  implements ICommandHandler<UpdateAccessCommand>
{
  constructor(
    private readonly findAccessByIdRepository: FindAccessByIdRepository,
    private readonly updateAccessRepository: UpdateAccessRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateAccessCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const accessId = splitServiceId(data.where?.accessId)?.id;
    if (!accessId) {
      throw new ParamNotFoundException('accessId');
    }

    const access = await this.findAccessByIdRepository.execute(accessId);
    if (!access) {
      throw new AccessNotFoundException();
    }

    const updated = await this.updateAccessRepository.execute({
      ...data,
      where: {
        ...data.where,
        accessId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const accessUpdated = await this.findAccessByIdRepository.execute(accessId);
    if (!accessUpdated) {
      throw new AccessNotFoundException();
    }
    const accessModel = this.publisher.mergeObjectContext(accessUpdated);
    accessModel.updatedAccess();
    accessModel.commit();

    return accessUpdated;
  }

  private clearData(command: UpdateAccessCommand): UpdateAccessCommand {
    return cleanObject({
      where: cleanObject({
        accessId: cleanValue(command?.where?.accessId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
