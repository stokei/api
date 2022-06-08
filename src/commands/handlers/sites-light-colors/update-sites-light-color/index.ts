import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSitesLightColorCommand } from '@/commands/implements/sites-light-colors/update-sites-light-color.command';
import {
  SitesLightColorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindSitesLightColorByIdRepository } from '@/repositories/sites-light-colors/find-sites-light-color-by-id';
import { UpdateSitesLightColorRepository } from '@/repositories/sites-light-colors/update-sites-light-color';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type UpdateSitesLightColorCommandKeys = keyof UpdateSitesLightColorCommand;

@CommandHandler(UpdateSitesLightColorCommand)
export class UpdateSitesLightColorCommandHandler
  implements ICommandHandler<UpdateSitesLightColorCommand>
{
  constructor(
    private readonly findSitesLightColorByIdRepository: FindSitesLightColorByIdRepository,
    private readonly updateSitesLightColorRepository: UpdateSitesLightColorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateSitesLightColorCommand) {
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

    const updated = await this.updateSitesLightColorRepository.execute({
      ...data,
      where: {
        ...data.where,
        sitesLightColorId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const sitesLightColorUpdated =
      await this.findSitesLightColorByIdRepository.execute(sitesLightColorId);
    if (!sitesLightColorUpdated) {
      throw new SitesLightColorNotFoundException();
    }
    const sitesLightColorModel = this.publisher.mergeObjectContext(
      sitesLightColorUpdated
    );
    sitesLightColorModel.updatedSitesLightColor();
    sitesLightColorModel.commit();

    return sitesLightColorUpdated;
  }

  private clearData(
    command: UpdateSitesLightColorCommand
  ): UpdateSitesLightColorCommand {
    return cleanObject({
      where: cleanObject({
        sitesLightColorId: cleanValue(command?.where?.sitesLightColorId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
