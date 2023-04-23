import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateCatalogCommand } from '@/commands/implements/catalogs/create-catalog.command';
import {
  CatalogNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateCatalogRepository } from '@/repositories/catalogs/create-catalog';

type CreateCatalogCommandKeys = keyof CreateCatalogCommand;

@CommandHandler(CreateCatalogCommand)
export class CreateCatalogCommandHandler
  implements ICommandHandler<CreateCatalogCommand>
{
  constructor(
    private readonly createCatalogRepository: CreateCatalogRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateCatalogCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateCatalogCommandKeys>('parent');
    }
    if (!data?.title) {
      throw new ParamNotFoundException<CreateCatalogCommandKeys>('title');
    }

    const catalogCreated = await this.createCatalogRepository.execute(data);
    if (!catalogCreated) {
      throw new CatalogNotFoundException();
    }
    const catalogModel = this.publisher.mergeObjectContext(catalogCreated);
    catalogModel.createdCatalog({
      createdBy: data.createdBy
    });
    catalogModel.commit();

    return catalogCreated;
  }

  private clearData(command: CreateCatalogCommand): CreateCatalogCommand {
    return cleanObject({
      parent: cleanValue(command?.parent),
      app: cleanValue(command?.app),
      title: cleanValue(command?.title),
      subtitle: cleanValue(command?.subtitle),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
