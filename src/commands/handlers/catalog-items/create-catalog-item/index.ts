import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateCatalogItemCommand } from '@/commands/implements/catalog-items/create-catalog-item.command';
import {
  CatalogItemNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateCatalogItemRepository } from '@/repositories/catalog-items/create-catalog-item';

type CreateCatalogItemCommandKeys = keyof CreateCatalogItemCommand;

@CommandHandler(CreateCatalogItemCommand)
export class CreateCatalogItemCommandHandler
  implements ICommandHandler<CreateCatalogItemCommand>
{
  constructor(
    private readonly createCatalogItemRepository: CreateCatalogItemRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateCatalogItemCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.catalog) {
      throw new ParamNotFoundException<CreateCatalogItemCommandKeys>('catalog');
    }
    if (!data?.product) {
      throw new ParamNotFoundException<CreateCatalogItemCommandKeys>('product');
    }

    const catalogItemCreated = await this.createCatalogItemRepository.execute(
      data
    );
    if (!catalogItemCreated) {
      throw new CatalogItemNotFoundException();
    }
    const catalogItemModel =
      this.publisher.mergeObjectContext(catalogItemCreated);
    catalogItemModel.createdCatalogItem({
      createdBy: data.createdBy
    });
    catalogItemModel.commit();

    return catalogItemCreated;
  }

  private clearData(
    command: CreateCatalogItemCommand
  ): CreateCatalogItemCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      product: cleanValue(command?.product),
      catalog: cleanValue(command?.catalog)
    });
  }
}
