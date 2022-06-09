import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateSitesDarkColorCommand } from '@/commands/implements/sites-dark-colors/update-sites-dark-color.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  SitesDarkColorNotFoundException
} from '@/errors';
import { FindSitesDarkColorByIdRepository } from '@/repositories/sites-dark-colors/find-sites-dark-color-by-id';
import { UpdateSitesDarkColorRepository } from '@/repositories/sites-dark-colors/update-sites-dark-color';

type UpdateSitesDarkColorCommandKeys = keyof UpdateSitesDarkColorCommand;

@CommandHandler(UpdateSitesDarkColorCommand)
export class UpdateSitesDarkColorCommandHandler
  implements ICommandHandler<UpdateSitesDarkColorCommand>
{
  constructor(
    private readonly findSitesDarkColorByIdRepository: FindSitesDarkColorByIdRepository,
    private readonly updateSitesDarkColorRepository: UpdateSitesDarkColorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateSitesDarkColorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const sitesDarkColorId = splitServiceId(data.where?.sitesDarkColorId)?.id;
    if (!sitesDarkColorId) {
      throw new ParamNotFoundException('sitesDarkColorId');
    }

    const sitesDarkColor = await this.findSitesDarkColorByIdRepository.execute(
      sitesDarkColorId
    );
    if (!sitesDarkColor) {
      throw new SitesDarkColorNotFoundException();
    }

    const updated = await this.updateSitesDarkColorRepository.execute({
      ...data,
      where: {
        ...data.where,
        sitesDarkColorId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const sitesDarkColorUpdated =
      await this.findSitesDarkColorByIdRepository.execute(sitesDarkColorId);
    if (!sitesDarkColorUpdated) {
      throw new SitesDarkColorNotFoundException();
    }
    const sitesDarkColorModel = this.publisher.mergeObjectContext(
      sitesDarkColorUpdated
    );
    sitesDarkColorModel.updatedSitesDarkColor();
    sitesDarkColorModel.commit();

    return sitesDarkColorUpdated;
  }

  private clearData(
    command: UpdateSitesDarkColorCommand
  ): UpdateSitesDarkColorCommand {
    return cleanObject({
      where: cleanObject({
        sitesDarkColorId: cleanValue(command?.where?.sitesDarkColorId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
