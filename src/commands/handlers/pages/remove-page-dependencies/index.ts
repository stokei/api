import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemovePageDependenciesCommand } from '@/commands/implements/pages/remove-page-dependencies.command';
import { DataNotFoundException, ParamNotFoundException } from '@/errors';
import { RemoveVersionService } from '@/services/versions/remove-version';

type RemovePageDependenciesCommandKeys = keyof RemovePageDependenciesCommand;

@CommandHandler(RemovePageDependenciesCommand)
export class RemovePageDependenciesCommandHandler
  implements ICommandHandler<RemovePageDependenciesCommand>
{
  private readonly logger = new Logger(
    RemovePageDependenciesCommandHandler.name
  );
  constructor(private readonly removeVersionService: RemoveVersionService) {}

  async execute(command: RemovePageDependenciesCommand) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.page) {
        throw new ParamNotFoundException<RemovePageDependenciesCommandKeys>(
          'page'
        );
      }
      const page = data.page;

      await this.removeVersionService.execute({
        where: {
          version: page.version,
          app: data.app,
          removedBy: data.removedBy
        }
      });
      if (page.draftVersion !== page.version) {
        await this.removeVersionService.execute({
          where: {
            version: page.draftVersion,
            app: data.app,
            removedBy: data.removedBy
          }
        });
      }
      return true;
    } catch (error) {
      this.logger.error(
        `Page(#${data?.page?.title} - ${data?.page?.id}): ${error?.message}`
      );
      return;
    }
  }

  private clearData(
    command: RemovePageDependenciesCommand
  ): RemovePageDependenciesCommand {
    return cleanObject({
      removedBy: cleanValue(command?.removedBy),
      app: cleanValue(command?.app),
      page: command?.page
    });
  }
}
