import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveVersionCommand } from '@/commands/implements/versions/remove-version.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  VersionNotFoundException
} from '@/errors';
import { FindVersionByIdRepository } from '@/repositories/versions/find-version-by-id';
import { RemoveVersionRepository } from '@/repositories/versions/remove-version';

type RemoveVersionCommandKeys = keyof RemoveVersionCommand;

@CommandHandler(RemoveVersionCommand)
export class RemoveVersionCommandHandler
  implements ICommandHandler<RemoveVersionCommand>
{
  constructor(
    private readonly findVersionByIdRepository: FindVersionByIdRepository,
    private readonly removeVersionRepository: RemoveVersionRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveVersionCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const versionId = splitServiceId(data.where?.versionId)?.id;
    if (!versionId) {
      throw new ParamNotFoundException('versionId');
    }

    const version = await this.findVersionByIdRepository.execute(versionId);
    if (!version) {
      throw new VersionNotFoundException();
    }

    const removed = await this.removeVersionRepository.execute({
      where: {
        versionId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const versionModel = this.publisher.mergeObjectContext(version);
    versionModel.removedVersion();
    versionModel.commit();

    return version;
  }

  private clearData(command: RemoveVersionCommand): RemoveVersionCommand {
    return cleanObject({
      where: cleanObject({
        versionId: cleanValue(command?.where?.versionId)
      })
    });
  }
}
