import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanSlug, cleanValue } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { CreateAppDefaultLandingPageCommand } from '@/commands/implements/apps/create-app-default-landing-page.command';
import { ComponentType } from '@/enums/component-type.enum';
import {
  AppNotFoundException,
  DataNotFoundException,
  PageNotFoundException,
  ParamNotFoundException,
  SiteNotFoundException,
  VersionNotFoundException
} from '@/errors';
import { CreateAppCatalogService } from '@/services/apps/create-app-catalog';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { CreateCatalogService } from '@/services/catalogs/create-catalog';
import { CreateComponentService } from '@/services/components/create-component';
import { CreateComponentsTreeService } from '@/services/components/create-components-tree';
import { CreatePageService } from '@/services/pages/create-page';
import { CreateSiteService } from '@/services/sites/create-site';
import { UpdateSiteService } from '@/services/sites/update-site';

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
    private readonly createSiteService: CreateSiteService,
    private readonly updateSiteService: UpdateSiteService,
    private readonly createPageService: CreatePageService,
    private readonly createComponentService: CreateComponentService,
    private readonly createComponentsTreeService: CreateComponentsTreeService,
    private readonly createAppCatalogService: CreateAppCatalogService,
    private readonly createCatalogService: CreateCatalogService
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

      const createdBy = data.createdBy;

      const site = await this.createSiteService.execute({
        name: app.name,
        slug: cleanSlug(app.name + nanoid(6)),
        parent: app.id,
        app: app.id,
        createdBy
      });
      if (!site) {
        throw new SiteNotFoundException();
      }
      const homePage = await this.createPageService.execute({
        parent: site.id,
        title: 'Início',
        app: app.id,
        createdBy
      });
      if (!homePage) {
        throw new PageNotFoundException();
      }
      await this.updateSiteService.execute({
        data: {
          homePage: homePage?.id,
          updatedBy: createdBy
        },
        where: {
          app: app.id,
          site: site.id
        }
      });

      const versionId = homePage.version;
      if (!versionId) {
        throw new VersionNotFoundException();
      }

      await this.createAppCatalogService.execute({
        app: app.id,
        createdBy
      });
      const coursesCatalog = await this.createCatalogService.execute({
        parent: app.id,
        app: app.id,
        createdBy,
        title: 'Cursos'
      });
      const materialsCatalog = await this.createCatalogService.execute({
        parent: app.id,
        app: app.id,
        createdBy,
        title: 'Materiais'
      });

      await this.createComponentsTreeService.execute({
        app: app.id,
        createdBy,
        tree: [
          {
            type: ComponentType.BLOCK,
            parent: versionId,
            app: app.id,
            createdBy,
            data: {},
            components: [
              {
                type: ComponentType.NAVBAR,
                parent: versionId,
                app: app.id,
                createdBy,
                data: {},
                components: []
              }
            ]
          },
          {
            type: ComponentType.BLOCK,
            parent: versionId,
            app: app.id,
            createdBy,
            data: {},
            components: [
              {
                type: ComponentType.CATALOG,
                parent: versionId,
                app: app.id,
                createdBy,
                data: {
                  catalog: coursesCatalog.id
                },
                components: []
              }
            ]
          },
          {
            type: ComponentType.BLOCK,
            parent: versionId,
            app: app.id,
            createdBy,
            data: {},
            components: [
              {
                type: ComponentType.CATALOG,
                parent: versionId,
                app: app.id,
                createdBy,
                data: {
                  catalog: materialsCatalog.id
                },
                components: []
              }
            ]
          },
          {
            type: ComponentType.BLOCK,
            parent: versionId,
            app: app.id,
            createdBy,
            data: {},
            components: [
              {
                type: ComponentType.HERO,
                parent: '',
                app: app.id,
                createdBy,
                data: {},
                components: [
                  {
                    type: ComponentType.HERO_CONTENT,
                    parent: '',
                    app: app.id,
                    createdBy,
                    data: {},
                    components: [
                      {
                        type: ComponentType.TITLE,
                        parent: '',
                        app: app.id,
                        createdBy,
                        data: {
                          value: 'VAMOS APRENDER JUNTOS'
                        },
                        components: []
                      },
                      {
                        type: ComponentType.TEXT,
                        parent: '',
                        app: app.id,
                        createdBy,
                        data: {
                          value:
                            'Torne-se um membro e venha conhecer o melhor do meu conteúdo.'
                        },
                        components: []
                      },
                      {
                        type: ComponentType.BUTTON,
                        parent: '',
                        app: app.id,
                        createdBy,
                        data: {
                          text: 'Cadastre-se'
                        },
                        components: []
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: ComponentType.BLOCK,
            parent: versionId,
            app: app.id,
            createdBy,
            data: {},
            components: [
              {
                type: ComponentType.FOOTER,
                parent: versionId,
                app: app.id,
                createdBy,
                data: {},
                components: []
              }
            ]
          }
        ]
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
