import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateCatalogCommand } from '@/commands/implements/catalogs/update-catalog.command';
import {
  CatalogNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCatalogByIdRepository } from '@/repositories/catalogs/find-catalog-by-id';
import { UpdateCatalogRepository } from '@/repositories/catalogs/update-catalog';

@CommandHandler(UpdateCatalogCommand)
export class UpdateCatalogCommandHandler
  implements ICommandHandler<UpdateCatalogCommand>
{
  constructor(
    private readonly findCatalogByIdRepository: FindCatalogByIdRepository,
    private readonly updateCatalogRepository: UpdateCatalogRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateCatalogCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const catalogId = splitServiceId(data.where?.catalog)?.id;
    if (!catalogId) {
      throw new ParamNotFoundException('catalogId');
    }

    const catalog = await this.findCatalogByIdRepository.execute(catalogId);
    if (!catalog) {
      throw new CatalogNotFoundException();
    }

    const updated = await this.updateCatalogRepository.execute({
      ...data,
      where: {
        ...data.where,
        catalog: catalogId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const catalogUpdated = await this.findCatalogByIdRepository.execute(
      catalogId
    );
    if (!catalogUpdated) {
      throw new CatalogNotFoundException();
    }
    const catalogModel = this.publisher.mergeObjectContext(catalogUpdated);
    catalogModel.updatedCatalog({
      updatedBy: data.data.updatedBy
    });
    catalogModel.commit();

    return catalogUpdated;
  }

  private clearData(command: UpdateCatalogCommand): UpdateCatalogCommand {
    return cleanObject({
      where: cleanObject({
        app: cleanValue(command?.where?.app),
        catalog: cleanValue(command?.where?.catalog)
      }),
      data: cleanObject({
        title: cleanValue(command?.data?.title),
        subtitle: cleanValue(command?.data?.subtitle),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
