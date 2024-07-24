import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemoveProductComboItemCommand } from '@/commands/implements/product-combo-items/remove-product-combo-item.command';
import {
  ProductComboItemNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { RemoveProductComboItemRepository } from '@/repositories/product-combo-items/remove-product-combo-item';
import { FindAllProductComboItemsService } from '@/services/product-combo-items/find-all-product-combo-items';

@CommandHandler(RemoveProductComboItemCommand)
export class RemoveProductComboItemCommandHandler
  implements ICommandHandler<RemoveProductComboItemCommand>
{
  constructor(
    private readonly findAllProductComboItemsService: FindAllProductComboItemsService,
    private readonly removeProductComboItemRepository: RemoveProductComboItemRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveProductComboItemCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const { parent, product, app } = data.where || {};
    if (!parent) {
      throw new ParamNotFoundException('parentId');
    }
    if (!product) {
      throw new ParamNotFoundException('productId');
    }

    const productComboItems =
      await this.findAllProductComboItemsService.execute({
        where: {
          AND: {
            app: {
              equals: app
            },
            parent: {
              equals: parent
            },
            product: {
              equals: product
            }
          }
        }
      });
    if (!productComboItems?.totalCount) {
      throw new ProductComboItemNotFoundException();
    }

    const allProductComboItems =
      await this.findAllProductComboItemsService.execute({
        where: {
          AND: {
            app: {
              equals: app
            },
            product: {
              equals: product
            }
          }
        },
        page: {
          limit: 1
        }
      });

    const productComboItem = productComboItems?.items?.[0];
    const removed = await this.removeProductComboItemRepository.execute({
      where: {
        ...data.where,
        parent,
        product
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const isLastProductComboItem = allProductComboItems?.totalCount === 1;
    const productComboItemModel =
      this.publisher.mergeObjectContext(productComboItem);
    productComboItemModel.removedProductComboItem({
      isLastProductComboItem,
      removedBy: data.where.removedBy
    });
    productComboItemModel.commit();

    return productComboItem;
  }

  private clearData(
    command: RemoveProductComboItemCommand
  ): RemoveProductComboItemCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        parent: cleanValue(command?.where?.parent),
        product: cleanValue(command?.where?.product)
      })
    });
  }
}
