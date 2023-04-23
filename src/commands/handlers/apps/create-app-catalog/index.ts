import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateAppCatalogCommand } from '@/commands/implements/apps/create-app-catalog.command';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CatalogNotFoundException } from '@/errors/catalog-not-found';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { UpdateAppService } from '@/services/apps/update-app';
import { CreateCatalogService } from '@/services/catalogs/create-catalog';

type CreateAppCatalogCommandKeys = keyof CreateAppCatalogCommand;

@CommandHandler(CreateAppCatalogCommand)
export class CreateAppCatalogCommandHandler
  implements ICommandHandler<CreateAppCatalogCommand>
{
  private readonly logger = new Logger(CreateAppCatalogCommandHandler.name);
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly createCatalogService: CreateCatalogService,
    private readonly updateAppService: UpdateAppService
  ) {}

  async execute(command: CreateAppCatalogCommand) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.app) {
        throw new ParamNotFoundException<CreateAppCatalogCommandKeys>('app');
      }

      const app = await this.findAppByIdService.execute(data.app);
      if (!app) {
        throw new AppNotFoundException();
      }

      const catalog = await this.createCatalogService.execute({
        parent: app.id,
        app: app.id,
        createdBy: data.createdBy,
        title: 'Produtos recomendados'
      });
      if (!catalog) {
        throw new CatalogNotFoundException();
      }
      const updated = await this.updateAppService.execute({
        data: {
          catalog: catalog.id,
          updatedBy: data.createdBy
        },
        where: {
          app: app.id
        }
      });
      if (!updated) {
        throw new AppNotFoundException();
      }
      const appUpdated = await this.findAppByIdService.execute(app.id);
      if (!appUpdated) {
        throw new AppNotFoundException();
      }
      return appUpdated;
    } catch (error) {
      this.logger.error(`App(#${data?.app}): ${error?.message}`);
      return;
    }
  }

  private clearData(command: CreateAppCatalogCommand): CreateAppCatalogCommand {
    return cleanObject({
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
