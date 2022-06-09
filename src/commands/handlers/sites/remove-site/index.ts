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

type RemoveSiteCommandKeys = keyof RemoveSiteCommand;

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
    const siteId = splitServiceId(data.where?.siteId)?.id;
    if (!siteId) {
      throw new ParamNotFoundException('siteId');
    }

    const site = await this.findSiteByIdRepository.execute(siteId);
    if (!site) {
      throw new SiteNotFoundException();
    }

    const removed = await this.removeSiteRepository.execute({
      where: {
        siteId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const siteModel = this.publisher.mergeObjectContext(site);
    siteModel.removedSite();
    siteModel.commit();

    return site;
  }

  private clearData(command: RemoveSiteCommand): RemoveSiteCommand {
    return cleanObject({
      where: cleanObject({
        siteId: cleanValue(command?.where?.siteId)
      })
    });
  }
}
