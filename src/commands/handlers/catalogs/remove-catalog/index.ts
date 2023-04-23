import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveCatalogCommand } from '@/commands/implements/catalogs/remove-catalog.command';
import {
  CatalogNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCatalogByIdRepository } from '@/repositories/catalogs/find-catalog-by-id';
import { RemoveCatalogRepository } from '@/repositories/catalogs/remove-catalog';

@CommandHandler(RemoveCatalogCommand)
export class RemoveCatalogCommandHandler
  implements ICommandHandler<RemoveCatalogCommand>
{
  constructor(
    private readonly findCatalogByIdRepository: FindCatalogByIdRepository,
    private readonly removeCatalogRepository: RemoveCatalogRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveCatalogCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const catalogId = splitServiceId(data.where?.catalog)?.id;
    if (!catalogId) {
      throw new ParamNotFoundException('catalogId');
    }

    const catalog = await this.findCatalogByIdRepository.execute(catalogId);
    if (!catalog) {
      throw new CatalogNotFoundException();
    }

    const removed = await this.removeCatalogRepository.execute({
      where: {
        ...data.where,
        catalog: catalogId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const catalogModel = this.publisher.mergeObjectContext(catalog);
    catalogModel.removedCatalog({
      removedBy: data.where.removedBy
    });
    catalogModel.commit();

    return catalog;
  }

  private clearData(command: RemoveCatalogCommand): RemoveCatalogCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        catalog: cleanValue(command?.where?.catalog)
      })
    });
  }
}
