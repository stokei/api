import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateModuleVideoCommand } from '@/commands/implements/module-videos/update-module-video.command';
import {
  DataNotFoundException,
  ModuleVideoNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindModuleVideoByIdRepository } from '@/repositories/module-videos/find-module-video-by-id';
import { UpdateModuleVideoRepository } from '@/repositories/module-videos/update-module-video';

type UpdateModuleVideoCommandKeys = keyof UpdateModuleVideoCommand;

@CommandHandler(UpdateModuleVideoCommand)
export class UpdateModuleVideoCommandHandler
  implements ICommandHandler<UpdateModuleVideoCommand>
{
  constructor(
    private readonly findModuleVideoByIdRepository: FindModuleVideoByIdRepository,
    private readonly updateModuleVideoRepository: UpdateModuleVideoRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateModuleVideoCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const moduleVideoId = splitServiceId(data.where?.moduleVideoId)?.id;
    if (!moduleVideoId) {
      throw new ParamNotFoundException('moduleVideoId');
    }

    const moduleVideo = await this.findModuleVideoByIdRepository.execute(
      moduleVideoId
    );
    if (!moduleVideo) {
      throw new ModuleVideoNotFoundException();
    }

    const updated = await this.updateModuleVideoRepository.execute({
      ...data,
      where: {
        ...data.where,
        moduleVideoId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const moduleVideoUpdated = await this.findModuleVideoByIdRepository.execute(
      moduleVideoId
    );
    if (!moduleVideoUpdated) {
      throw new ModuleVideoNotFoundException();
    }
    const moduleVideoModel =
      this.publisher.mergeObjectContext(moduleVideoUpdated);
    moduleVideoModel.updatedModuleVideo({
      updatedBy: data.data.updatedBy
    });
    moduleVideoModel.commit();

    return moduleVideoUpdated;
  }

  private clearData(
    command: UpdateModuleVideoCommand
  ): UpdateModuleVideoCommand {
    return cleanObject({
      where: cleanObject({
        moduleVideoId: cleanValue(command?.where?.moduleVideoId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
