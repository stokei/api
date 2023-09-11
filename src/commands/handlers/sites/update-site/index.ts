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
    const siteId = splitServiceId(data.where?.site)?.id;
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
        site: siteId
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
    siteModel.updatedSite({
      updatedBy: data.data.updatedBy
    });
    siteModel.commit();

    return siteUpdated;
  }

  private clearData(command: UpdateSiteCommand): UpdateSiteCommand {
    return cleanObject({
      where: cleanObject({
        app: cleanValue(command?.where?.app),
        site: cleanValue(command?.where?.site)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        slug: cleanValue(command?.data?.slug),
        favicon: cleanValue(command?.data?.favicon),
        logo: cleanValue(command?.data?.logo),
        homeSite: cleanValue(command?.data?.homeSite),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
