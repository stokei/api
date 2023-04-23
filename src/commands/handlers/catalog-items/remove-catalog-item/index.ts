import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemoveCatalogItemCommand } from '@/commands/implements/catalog-items/remove-catalog-item.command';
import {
  CatalogItemNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { RemoveCatalogItemRepository } from '@/repositories/catalog-items/remove-catalog-item';
import { FindAllCatalogItemsService } from '@/services/catalog-items/find-all-catalog-items';

@CommandHandler(RemoveCatalogItemCommand)
export class RemoveCatalogItemCommandHandler
  implements ICommandHandler<RemoveCatalogItemCommand>
{
  constructor(
    private readonly findAllCatalogItemsService: FindAllCatalogItemsService,
    private readonly removeCatalogItemRepository: RemoveCatalogItemRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveCatalogItemCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const { catalog, product, app } = data.where || {};
    if (!catalog) {
      throw new ParamNotFoundException('catalogId');
    }
    if (!product) {
      throw new ParamNotFoundException('productId');
    }

    const catalogItems = await this.findAllCatalogItemsService.execute({
      where: {
        AND: {
          app: {
            equals: app
          },
          catalog: {
            equals: catalog
          },
          product: {
            equals: product
          }
        }
      }
    });
    if (!catalogItems?.totalCount) {
      throw new CatalogItemNotFoundException();
    }

    const catalogItem = catalogItems?.items?.[0];
    const removed = await this.removeCatalogItemRepository.execute({
      where: {
        ...data.where,
        catalog,
        product
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const catalogItemModel = this.publisher.mergeObjectContext(catalogItem);
    catalogItemModel.removedCatalogItem({
      removedBy: data.where.removedBy
    });
    catalogItemModel.commit();

    return catalogItem;
  }

  private clearData(
    command: RemoveCatalogItemCommand
  ): RemoveCatalogItemCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        catalog: cleanValue(command?.where?.catalog),
        product: cleanValue(command?.where?.product)
      })
    });
  }
}
