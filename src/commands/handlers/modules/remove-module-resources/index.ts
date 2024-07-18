import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemoveModuleResourcesCommand } from '@/commands/implements/modules/remove-module-resources.command';
import {
  DataNotFoundException,
  ModuleNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ModuleModel } from '@/models/module.model';
import { FindAllVideosService } from '@/services/videos/find-all-videos';
import { RemoveVideoService } from '@/services/videos/remove-video';

@CommandHandler(RemoveModuleResourcesCommand)
export class RemoveModuleResourcesCommandHandler
  implements ICommandHandler<RemoveModuleResourcesCommand>
{
  private readonly logger = new Logger(
    RemoveModuleResourcesCommandHandler.name
  );
  constructor(
    private readonly findAllVideosService: FindAllVideosService,
    private readonly removeVideoService: RemoveVideoService
  ) {}

  async execute(command: RemoveModuleResourcesCommand) {
    try {
      const data = this.clearData(command);
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data.module) {
        throw new ModuleNotFoundException();
      }
      if (!data.removedBy) {
        throw new ParamNotFoundException('removedBy');
      }
      await this.clearVideos({
        module: data.module,
        removedBy: data.removedBy
      });
      this.logger.log(
        `${command.module?.name}(${command.module?.id}) - Resources removed!`
      );
    } catch (error) {
      this.logger.error(
        `${command.module?.name}(${command.module?.id}) - error ${error.message}`
      );
    }
  }

  private clearData(
    command: RemoveModuleResourcesCommand
  ): RemoveModuleResourcesCommand {
    return cleanObject({
      module: command?.module,
      removedBy: cleanValue(command?.removedBy)
    });
  }

  private async clearVideos({
    module,
    removedBy
  }: {
    module: ModuleModel;
    removedBy: string;
  }) {
    try {
      const videos = await this.findAllVideosService.execute({
        where: {
          AND: {
            parent: {
              equals: module.id
            }
          }
        }
      });

      if (!videos?.totalCount) {
        return;
      }
      await Promise.allSettled(
        videos.items.map((video) =>
          this.removeVideoService.execute({
            where: {
              video: video.id,
              app: module.app,
              removedBy
            }
          })
        )
      );
    } catch (error) {}
  }
}
