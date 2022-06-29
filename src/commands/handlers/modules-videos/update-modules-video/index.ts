import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateModulesVideoCommand } from '@/commands/implements/modules-videos/update-modules-video.command';
import {
  DataNotFoundException,
  ModulesVideoNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindModulesVideoByIdRepository } from '@/repositories/modules-videos/find-modules-video-by-id';
import { UpdateModulesVideoRepository } from '@/repositories/modules-videos/update-modules-video';

type UpdateModulesVideoCommandKeys = keyof UpdateModulesVideoCommand;

@CommandHandler(UpdateModulesVideoCommand)
export class UpdateModulesVideoCommandHandler
  implements ICommandHandler<UpdateModulesVideoCommand>
{
  constructor(
    private readonly findModulesVideoByIdRepository: FindModulesVideoByIdRepository,
    private readonly updateModulesVideoRepository: UpdateModulesVideoRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateModulesVideoCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const modulesVideoId = splitServiceId(data.where?.modulesVideoId)?.id;
    if (!modulesVideoId) {
      throw new ParamNotFoundException('modulesVideoId');
    }

    const modulesVideo = await this.findModulesVideoByIdRepository.execute(
      modulesVideoId
    );
    if (!modulesVideo) {
      throw new ModulesVideoNotFoundException();
    }

    const updated = await this.updateModulesVideoRepository.execute({
      ...data,
      where: {
        ...data.where,
        modulesVideoId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const modulesVideoUpdated =
      await this.findModulesVideoByIdRepository.execute(modulesVideoId);
    if (!modulesVideoUpdated) {
      throw new ModulesVideoNotFoundException();
    }
    const modulesVideoModel =
      this.publisher.mergeObjectContext(modulesVideoUpdated);
    modulesVideoModel.updatedModulesVideo({
      updatedBy: data.data.updatedBy
    });
    modulesVideoModel.commit();

    return modulesVideoUpdated;
  }

  private clearData(
    command: UpdateModulesVideoCommand
  ): UpdateModulesVideoCommand {
    return cleanObject({
      where: cleanObject({
        modulesVideoId: cleanValue(command?.where?.modulesVideoId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
