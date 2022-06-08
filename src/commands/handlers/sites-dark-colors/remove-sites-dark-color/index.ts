import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveSitesDarkColorCommand } from '@/commands/implements/sites-dark-colors/remove-sites-dark-color.command';
import {
  SitesDarkColorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindSitesDarkColorByIdRepository } from '@/repositories/sites-dark-colors/find-sites-dark-color-by-id';
import { RemoveSitesDarkColorRepository } from '@/repositories/sites-dark-colors/remove-sites-dark-color';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveSitesDarkColorCommandKeys = keyof RemoveSitesDarkColorCommand;

@CommandHandler(RemoveSitesDarkColorCommand)
export class RemoveSitesDarkColorCommandHandler
  implements ICommandHandler<RemoveSitesDarkColorCommand>
{
  constructor(
    private readonly findSitesDarkColorByIdRepository: FindSitesDarkColorByIdRepository,
    private readonly removeSitesDarkColorRepository: RemoveSitesDarkColorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveSitesDarkColorCommand) {
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

    const removed = await this.removeSitesDarkColorRepository.execute({
      where: {
        sitesDarkColorId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const sitesDarkColorModel =
      this.publisher.mergeObjectContext(sitesDarkColor);
    sitesDarkColorModel.removedSitesDarkColor();
    sitesDarkColorModel.commit();

    return sitesDarkColor;
  }

  private clearData(
    command: RemoveSitesDarkColorCommand
  ): RemoveSitesDarkColorCommand {
    return cleanObject({
      where: cleanObject({
        sitesDarkColorId: cleanValue(command?.where?.sitesDarkColorId)
      })
    });
  }
}
