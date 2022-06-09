import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveProductsCategoryCommand } from '@/commands/implements/products-categories/remove-products-category.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  ProductsCategoryNotFoundException
} from '@/errors';
import { FindProductsCategoryByIdRepository } from '@/repositories/products-categories/find-products-category-by-id';
import { RemoveProductsCategoryRepository } from '@/repositories/products-categories/remove-products-category';

type RemoveProductsCategoryCommandKeys = keyof RemoveProductsCategoryCommand;

@CommandHandler(RemoveProductsCategoryCommand)
export class RemoveProductsCategoryCommandHandler
  implements ICommandHandler<RemoveProductsCategoryCommand>
{
  constructor(
    private readonly findProductsCategoryByIdRepository: FindProductsCategoryByIdRepository,
    private readonly removeProductsCategoryRepository: RemoveProductsCategoryRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveProductsCategoryCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const productsCategoryId = splitServiceId(
      data.where?.productsCategoryId
    )?.id;
    if (!productsCategoryId) {
      throw new ParamNotFoundException('productsCategoryId');
    }

    const productsCategory =
      await this.findProductsCategoryByIdRepository.execute(productsCategoryId);
    if (!productsCategory) {
      throw new ProductsCategoryNotFoundException();
    }

    const removed = await this.removeProductsCategoryRepository.execute({
      where: {
        productsCategoryId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const productsCategoryModel =
      this.publisher.mergeObjectContext(productsCategory);
    productsCategoryModel.removedProductsCategory();
    productsCategoryModel.commit();

    return productsCategory;
  }

  private clearData(
    command: RemoveProductsCategoryCommand
  ): RemoveProductsCategoryCommand {
    return cleanObject({
      where: cleanObject({
        productsCategoryId: cleanValue(command?.where?.productsCategoryId)
      })
    });
  }
}
