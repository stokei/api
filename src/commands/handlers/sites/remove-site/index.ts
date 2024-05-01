import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveSiteCommand } from '@/commands/implements/sites/remove-site.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  SiteNotFoundException
} from '@/errors';
import { FindSiteByIdRepository } from '@/repositories/sites/find-site-by-id';
import { RemoveSiteRepository } from '@/repositories/sites/remove-site';

@CommandHandler(RemoveSiteCommand)
export class RemoveSiteCommandHandler
  implements ICommandHandler<RemoveSiteCommand>
{
  constructor(
    private readonly findSiteByIdRepository: FindSiteByIdRepository,
    private readonly removeSiteRepository: RemoveSiteRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveSiteCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const siteId = splitServiceId(data.where?.site)?.id;
    if (!siteId) {
      throw new ParamNotFoundException('siteId');
    }

    const site = await this.findSiteByIdRepository.execute(siteId);
    if (!site) {
      throw new SiteNotFoundException();
    }

    const removed = await this.removeSiteRepository.execute({
      where: {
        ...data.where,
        site: siteId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const siteModel = this.publisher.mergeObjectContext(site);
    siteModel.removedSite({
      removedBy: data.where.removedBy
    });
    siteModel.commit();

    return site;
  }

  private clearData(command: RemoveSiteCommand): RemoveSiteCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        site: cleanValue(command?.where?.site)
      })
    });
  }
}
