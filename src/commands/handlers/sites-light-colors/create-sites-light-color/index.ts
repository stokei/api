import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateSitesLightColorCommand } from '@/commands/implements/sites-light-colors/create-sites-light-color.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  SitesLightColorNotFoundException
} from '@/errors';
import { CreateSitesLightColorRepository } from '@/repositories/sites-light-colors/create-sites-light-color';

type CreateSitesLightColorCommandKeys = keyof CreateSitesLightColorCommand;

@CommandHandler(CreateSitesLightColorCommand)
export class CreateSitesLightColorCommandHandler
  implements ICommandHandler<CreateSitesLightColorCommand>
{
  constructor(
    private readonly createSitesLightColorRepository: CreateSitesLightColorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateSitesLightColorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateSitesLightColorCommandKeys>(
        'parent'
      );
    }

    const sitesLightColorCreated =
      await this.createSitesLightColorRepository.execute(data);
    if (!sitesLightColorCreated) {
      throw new SitesLightColorNotFoundException();
    }
    const sitesLightColorModel = this.publisher.mergeObjectContext(
      sitesLightColorCreated
    );
    sitesLightColorModel.createdSitesLightColor();
    sitesLightColorModel.commit();

    return sitesLightColorCreated;
  }

  private clearData(
    command: CreateSitesLightColorCommand
  ): CreateSitesLightColorCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
