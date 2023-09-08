import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateAppDefaultLandingPageCommand } from '@/commands/implements/apps/create-app-default-landing-page.command';
import { HeroType } from '@/enums/hero-type.enum';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateAppCatalogService } from '@/services/apps/create-app-catalog';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { CreateCatalogService } from '@/services/catalogs/create-catalog';
import { CreateHeroService } from '@/services/heros/create-hero';
import { CreateSortedItemService } from '@/services/sorted-items/create-sorted-item';

type CreateAppDefaultLandingPageCommandKeys =
  keyof CreateAppDefaultLandingPageCommand;

@CommandHandler(CreateAppDefaultLandingPageCommand)
export class CreateAppDefaultLandingPageCommandHandler
  implements ICommandHandler<CreateAppDefaultLandingPageCommand>
{
  private readonly logger = new Logger(
    CreateAppDefaultLandingPageCommandHandler.name
  );
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly createHeroService: CreateHeroService,
    private readonly createAppCatalogService: CreateAppCatalogService,
    private readonly createCatalogService: CreateCatalogService,
    private readonly createSortedItemService: CreateSortedItemService
  ) {}

  async execute(command: CreateAppDefaultLandingPageCommand) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.app) {
        throw new ParamNotFoundException<CreateAppDefaultLandingPageCommandKeys>(
          'app'
        );
      }

      const app = await this.findAppByIdService.execute(data.app);
      if (!app) {
        throw new AppNotFoundException();
      }
      const hero = await this.createHeroService.execute({
        app: app.id,
        parent: app.id,
        createdBy: data.createdBy,
        type: HeroType.DEFAULT,
        title: 'Vamos aprender juntos',
        subtitle:
          'Torne-se um membro e venha conhecer o melhor do meu conteúdo.'
      });
      await this.createSortedItemService.execute({
        app: app.id,
        parent: app.id,
        item: hero.id,
        createdBy: data.createdBy
      });

      await this.createAppCatalogService.execute({
        app: app.id,
        createdBy: data.createdBy
      });

      const coursesCatalog = await this.createCatalogService.execute({
        parent: app.id,
        app: app.id,
        createdBy: data.createdBy,
        title: 'Cursos'
      });
      await this.createSortedItemService.execute({
        app: app.id,
        parent: app.id,
        item: coursesCatalog.id,
        createdBy: data.createdBy
      });

      const materialsCatalog = await this.createCatalogService.execute({
        parent: app.id,
        app: app.id,
        createdBy: data.createdBy,
        title: 'Materiais'
      });
      await this.createSortedItemService.execute({
        app: app.id,
        parent: app.id,
        item: materialsCatalog.id,
        createdBy: data.createdBy
      });
    } catch (error) {
      this.logger.error(`App(#${data?.app}): ${error?.message}`);
      return;
    }
  }

  private clearData(
    command: CreateAppDefaultLandingPageCommand
  ): CreateAppDefaultLandingPageCommand {
    return cleanObject({
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
