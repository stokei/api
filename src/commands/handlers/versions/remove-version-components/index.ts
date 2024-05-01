import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemoveVersionComponentsCommand } from '@/commands/implements/versions/remove-version-components.command';
import {
  ComponentsNotFoundException,
  DataNotFoundException,
  VersionNotFoundException
} from '@/errors';
import { FindAllComponentsWithComponentsChildrenService } from '@/services/components/find-all-components-with-components-children';
import { RemoveComponentsService } from '@/services/components/remove-components';

@CommandHandler(RemoveVersionComponentsCommand)
export class RemoveVersionComponentsCommandHandler
  implements ICommandHandler<RemoveVersionComponentsCommand>
{
  private readonly logger = new Logger(
    RemoveVersionComponentsCommandHandler.name
  );
  constructor(
    private readonly removeComponentsService: RemoveComponentsService,
    private readonly findAllComponentsWithComponentsChildrenService: FindAllComponentsWithComponentsChildrenService
  ) {}

  async execute(command: RemoveVersionComponentsCommand) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }

      const version = data.version;
      if (!version) {
        throw new VersionNotFoundException();
      }

      const components =
        await this.findAllComponentsWithComponentsChildrenService.execute({
          parent: version.id,
          app: data.app
        });
      if (!components?.length) {
        throw new ComponentsNotFoundException();
      }
      const componentsIds = components?.map(({ id }) => id);
      await this.removeComponentsService.execute(componentsIds);

      return version;
    } catch (error) {
      this.logger.error(
        `Version(#${data?.version?.name} - ${data?.version?.id}): ${error?.message}`
      );
      return;
    }
  }

  private clearData(
    command: RemoveVersionComponentsCommand
  ): RemoveVersionComponentsCommand {
    return cleanObject({
      removedBy: cleanValue(command?.removedBy),
      version: command?.version,
      app: cleanValue(command?.app)
    });
  }
}
