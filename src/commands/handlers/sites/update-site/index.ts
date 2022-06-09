import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateSiteCommand } from '@/commands/implements/sites/update-site.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  SiteNotFoundException
} from '@/errors';
import { FindSiteByIdRepository } from '@/repositories/sites/find-site-by-id';
import { UpdateSiteRepository } from '@/repositories/sites/update-site';

type UpdateSiteCommandKeys = keyof UpdateSiteCommand;

@CommandHandler(UpdateSiteCommand)
export class UpdateSiteCommandHandler
  implements ICommandHandler<UpdateSiteCommand>
{
  constructor(
    private readonly findSiteByIdRepository: FindSiteByIdRepository,
    private readonly updateSiteRepository: UpdateSiteRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateSiteCommand) {
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

    const updated = await this.updateSiteRepository.execute({
      ...data,
      where: {
        ...data.where,
        siteId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const siteUpdated = await this.findSiteByIdRepository.execute(siteId);
    if (!siteUpdated) {
      throw new SiteNotFoundException();
    }
    const siteModel = this.publisher.mergeObjectContext(siteUpdated);
    siteModel.updatedSite();
    siteModel.commit();

    return siteUpdated;
  }

  private clearData(command: UpdateSiteCommand): UpdateSiteCommand {
    return cleanObject({
      where: cleanObject({
        siteId: cleanValue(command?.where?.siteId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
