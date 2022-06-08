import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateSitesDarkColorCommand } from '@/commands/implements/sites-dark-colors/create-sites-dark-color.command';
import {
  SitesDarkColorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateSitesDarkColorRepository } from '@/repositories/sites-dark-colors/create-sites-dark-color';
import { cleanObject, cleanValue } from '@stokei/nestjs';

type CreateSitesDarkColorCommandKeys = keyof CreateSitesDarkColorCommand;

@CommandHandler(CreateSitesDarkColorCommand)
export class CreateSitesDarkColorCommandHandler
  implements ICommandHandler<CreateSitesDarkColorCommand>
{
  constructor(
    private readonly createSitesDarkColorRepository: CreateSitesDarkColorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateSitesDarkColorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateSitesDarkColorCommandKeys>(
        'parent'
      );
    }

    const sitesDarkColorCreated =
      await this.createSitesDarkColorRepository.execute(data);
    if (!sitesDarkColorCreated) {
      throw new SitesDarkColorNotFoundException();
    }
    const sitesDarkColorModel = this.publisher.mergeObjectContext(
      sitesDarkColorCreated
    );
    sitesDarkColorModel.createdSitesDarkColor();
    sitesDarkColorModel.commit();

    return sitesDarkColorCreated;
  }

  private clearData(
    command: CreateSitesDarkColorCommand
  ): CreateSitesDarkColorCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
