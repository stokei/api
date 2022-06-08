import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveSitesLightColorCommand } from '@/commands/implements/sites-light-colors/remove-sites-light-color.command';
import {
  SitesLightColorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindSitesLightColorByIdRepository } from '@/repositories/sites-light-colors/find-sites-light-color-by-id';
import { RemoveSitesLightColorRepository } from '@/repositories/sites-light-colors/remove-sites-light-color';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveSitesLightColorCommandKeys = keyof RemoveSitesLightColorCommand;

@CommandHandler(RemoveSitesLightColorCommand)
export class RemoveSitesLightColorCommandHandler
  implements ICommandHandler<RemoveSitesLightColorCommand>
{
  constructor(
    private readonly findSitesLightColorByIdRepository: FindSitesLightColorByIdRepository,
    private readonly removeSitesLightColorRepository: RemoveSitesLightColorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveSitesLightColorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const sitesLightColorId = splitServiceId(data.where?.sitesLightColorId)?.id;
    if (!sitesLightColorId) {
      throw new ParamNotFoundException('sitesLightColorId');
    }

    const sitesLightColor =
      await this.findSitesLightColorByIdRepository.execute(sitesLightColorId);
    if (!sitesLightColor) {
      throw new SitesLightColorNotFoundException();
    }

    const removed = await this.removeSitesLightColorRepository.execute({
      where: {
        sitesLightColorId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const sitesLightColorModel =
      this.publisher.mergeObjectContext(sitesLightColor);
    sitesLightColorModel.removedSitesLightColor();
    sitesLightColorModel.commit();

    return sitesLightColor;
  }

  private clearData(
    command: RemoveSitesLightColorCommand
  ): RemoveSitesLightColorCommand {
    return cleanObject({
      where: cleanObject({
        sitesLightColorId: cleanValue(command?.where?.sitesLightColorId)
      })
    });
  }
}
