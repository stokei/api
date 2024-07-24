import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateProductComboItemCommand } from '@/commands/implements/product-combo-items/create-product-combo-item.command';
import {
  ProductComboItemAlreadyExistsException,
  ProductComboItemNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateProductComboItemRepository } from '@/repositories/product-combo-items/create-product-combo-item';
import { ExistsProductComboItemsRepository } from '@/repositories/product-combo-items/exists-product-combo-items';

type CreateProductComboItemCommandKeys = keyof CreateProductComboItemCommand;

@CommandHandler(CreateProductComboItemCommand)
export class CreateProductComboItemCommandHandler
  implements ICommandHandler<CreateProductComboItemCommand>
{
  constructor(
    private readonly createProductComboItemRepository: CreateProductComboItemRepository,
    private readonly existsProductComboItemsRepository: ExistsProductComboItemsRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateProductComboItemCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateProductComboItemCommandKeys>(
        'parent'
      );
    }
    if (!data?.product) {
      throw new ParamNotFoundException<CreateProductComboItemCommandKeys>(
        'product'
      );
    }

    const existsProductComboItem =
      await this.existsProductComboItemsRepository.execute({
        where: {
          parent: data.parent,
          product: data.product
        }
      });
    if (existsProductComboItem) {
      throw new ProductComboItemAlreadyExistsException();
    }

    const productComboItemCreated =
      await this.createProductComboItemRepository.execute(data);
    if (!productComboItemCreated) {
      throw new ProductComboItemNotFoundException();
    }
    const productComboItemModel = this.publisher.mergeObjectContext(
      productComboItemCreated
    );
    productComboItemModel.createdProductComboItem({
      createdBy: data.createdBy
    });
    productComboItemModel.commit();

    return productComboItemCreated;
  }

  private clearData(
    command: CreateProductComboItemCommand
  ): CreateProductComboItemCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      product: cleanValue(command?.product),
      parent: cleanValue(command?.parent)
    });
  }
}
