import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

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

    const siteCreated = await this.createSiteRepository.execute(data);
    if (!siteCreated) {
      throw new SiteNotFoundException();
    }
    const siteModel = this.publisher.mergeObjectContext(siteCreated);
    siteModel.createdSite();
    siteModel.commit();

    return siteCreated;
  }

  private clearData(command: CreateSiteCommand): CreateSiteCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
