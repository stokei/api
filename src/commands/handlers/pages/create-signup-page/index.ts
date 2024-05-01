import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateSignUpPageCommand } from '@/commands/implements/pages/create-signup-page.command';
import { ComponentType } from '@/enums/component-type.enum';
import {
  DataNotFoundException,
  PageNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateComponentsTreeService } from '@/services/components/create-components-tree';
import { CreatePageService } from '@/services/pages/create-page';
import { UpdateSiteService } from '@/services/sites/update-site';

type CreateSignUpPageCommandKeys = keyof CreateSignUpPageCommand;

@CommandHandler(CreateSignUpPageCommand)
export class CreateSignUpPageCommandHandler
  implements ICommandHandler<CreateSignUpPageCommand>
{
  private readonly logger = new Logger(CreateSignUpPageCommandHandler.name);
  constructor(
    private readonly createPageService: CreatePageService,
    private readonly updateSiteService: UpdateSiteService,
    private readonly createComponentsTreeService: CreateComponentsTreeService
  ) {}

  async execute(command: CreateSignUpPageCommand) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.parent) {
        throw new ParamNotFoundException<CreateSignUpPageCommandKeys>('parent');
      }
      const pageCreated = await this.createPageService.execute({
        ...data,
        title: 'SignUp'
      });
      if (!pageCreated) {
        throw new PageNotFoundException();
      }
      const createdBy = data?.createdBy;
      const app = data?.app;
      const versionId = pageCreated?.version;
      await this.createComponentsTreeService.execute({
        app: data.app,
        createdBy: data.createdBy,
        tree: [
          {
            type: ComponentType.BLOCK,
            parent: versionId,
            app,
            createdBy,
            data: {},
            components: [
              {
                type: ComponentType.NAVBAR,
                parent: '',
                app,
                createdBy,
                data: {},
                components: []
              }
            ]
          },
          {
            type: ComponentType.BLOCK,
            parent: versionId,
            app,
            createdBy,
            data: {},
            components: [
              {
                type: ComponentType.FORM_SIGNUP,
                parent: '',
                app,
                createdBy,
                data: {},
                components: []
              }
            ]
          },
          {
            type: ComponentType.BLOCK,
            parent: versionId,
            app,
            createdBy,
            data: {},
            components: [
              {
                type: ComponentType.FOOTER,
                parent: '',
                app,
                createdBy,
                data: {},
                components: []
              }
            ]
          }
        ]
      });

      await this.updateSiteService.execute({
        data: {
          signUpPage: pageCreated.id,
          updatedBy: data.createdBy
        },
        where: {
          app: pageCreated.app,
          site: pageCreated.parent
        }
      });
      return pageCreated;
    } catch (error) {
      this.logger.error(`Parent(#${data?.parent} - SignUp): ${error?.message}`);
      return;
    }
  }

  private clearData(command: CreateSignUpPageCommand): CreateSignUpPageCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      parent: cleanValue(command?.parent)
    });
  }
}
