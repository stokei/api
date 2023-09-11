import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanSlug, cleanValue } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { CreateSiteCommand } from '@/commands/implements/sites/create-site.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  SiteNotFoundException
} from '@/errors';
import { CreateSiteRepository } from '@/repositories/sites/create-site';

type CreateSiteCommandKeys = keyof CreateSiteCommand;

@CommandHandler(CreateSiteCommand)
export class CreateSiteCommandHandler
  implements ICommandHandler<CreateSiteCommand>
{
  constructor(
    private readonly createSiteRepository: CreateSiteRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateSiteCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateSiteCommandKeys>('parent');
    }
    if (!data?.name) {
      throw new ParamNotFoundException<CreateSiteCommandKeys>('name');
    }

    const slug = cleanSlug(data.name + nanoid(8));
    const siteCreated = await this.createSiteRepository.execute({
      ...data,
      slug
    });
    if (!siteCreated) {
      throw new SiteNotFoundException();
    }
    const siteModel = this.publisher.mergeObjectContext(siteCreated);
    siteModel.createdSite({
      createdBy: data.createdBy
    });
    siteModel.commit();

    return siteCreated;
  }

  private clearData(command: CreateSiteCommand): CreateSiteCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      name: cleanValue(command?.name),
      slug: cleanValue(command?.slug),
      parent: cleanValue(command?.parent)
    });
  }
}
