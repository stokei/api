import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateVersionCommand } from '@/commands/implements/versions/update-version.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  VersionNotFoundException
} from '@/errors';
import { FindVersionByIdRepository } from '@/repositories/versions/find-version-by-id';
import { UpdateVersionRepository } from '@/repositories/versions/update-version';

@CommandHandler(UpdateVersionCommand)
export class UpdateVersionCommandHandler
  implements ICommandHandler<UpdateVersionCommand>
{
  constructor(
    private readonly findVersionByIdRepository: FindVersionByIdRepository,
    private readonly updateVersionRepository: UpdateVersionRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateVersionCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const versionId = splitServiceId(data.where?.version)?.id;
    if (!versionId) {
      throw new ParamNotFoundException('versionId');
    }

    const version = await this.findVersionByIdRepository.execute(versionId);
    if (!version) {
      throw new VersionNotFoundException();
    }

    const updated = await this.updateVersionRepository.execute({
      ...data,
      where: {
        ...data.where,
        version: versionId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const versionUpdated =
      await this.findVersionByIdRepository.execute(versionId);
    if (!versionUpdated) {
      throw new VersionNotFoundException();
    }
    const versionModel = this.publisher.mergeObjectContext(versionUpdated);
    versionModel.updatedVersion({
      updatedBy: data.data.updatedBy
    });
    versionModel.commit();

    return versionUpdated;
  }

  private clearData(command: UpdateVersionCommand): UpdateVersionCommand {
    return cleanObject({
      where: cleanObject({
        app: cleanValue(command?.where?.app),
        version: cleanValue(command?.where?.version)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
