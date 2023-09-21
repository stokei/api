import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemoveSiteDependenciesCommand } from '@/commands/implements/sites/remove-site-dependencies.command';
import { DataNotFoundException, ParamNotFoundException } from '@/errors';
import { FindAllPagesService } from '@/services/pages/find-all-pages';
import { RemovePageService } from '@/services/pages/remove-page';

type RemoveSiteDependenciesCommandKeys = keyof RemoveSiteDependenciesCommand;

@CommandHandler(RemoveSiteDependenciesCommand)
export class RemoveSiteDependenciesCommandHandler
  implements ICommandHandler<RemoveSiteDependenciesCommand>
{
  private readonly logger = new Logger(
    RemoveSiteDependenciesCommandHandler.name
  );
  constructor(
    private readonly removePageService: RemovePageService,
    private readonly findAllPagesService: FindAllPagesService
  ) {}

  async execute(command: RemoveSiteDependenciesCommand) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.site) {
        throw new ParamNotFoundException<RemoveSiteDependenciesCommandKeys>(
          'site'
        );
      }
      const site = data.site;

      const pages = await this.findAllPagesService.execute({
        where: {
          AND: {
            parent: {
              equals: site.id
            },
            app: {
              equals: data.app
            }
          }
        }
      });
      if (!pages?.totalCount) {
        return true;
      }
      await Promise.all(
        pages?.items?.map((page) =>
          this.removePageService.execute({
            where: {
              page: page.id,
              app: data.app,
              removedBy: data.removedBy
            }
          })
        )
      );
      return true;
    } catch (error) {
      this.logger.error(
        `Site(#${data?.site?.name} - ${data?.site?.id}): ${error?.message}`
      );
      return;
    }
  }

  private clearData(
    command: RemoveSiteDependenciesCommand
  ): RemoveSiteDependenciesCommand {
    return cleanObject({
      removedBy: cleanValue(command?.removedBy),
      app: cleanValue(command?.app),
      site: command?.site
    });
  }
}
