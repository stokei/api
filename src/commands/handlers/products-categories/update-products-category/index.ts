import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateProductsCategoryCommand } from '@/commands/implements/products-categories/update-products-category.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  ProductsCategoryNotFoundException
} from '@/errors';
import { FindProductsCategoryByIdRepository } from '@/repositories/products-categories/find-products-category-by-id';
import { UpdateProductsCategoryRepository } from '@/repositories/products-categories/update-products-category';

type UpdateProductsCategoryCommandKeys = keyof UpdateProductsCategoryCommand;

@CommandHandler(UpdateProductsCategoryCommand)
export class UpdateProductsCategoryCommandHandler
  implements ICommandHandler<UpdateProductsCategoryCommand>
{
  constructor(
    private readonly findProductsCategoryByIdRepository: FindProductsCategoryByIdRepository,
    private readonly updateProductsCategoryRepository: UpdateProductsCategoryRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateProductsCategoryCommand) {
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

    const updated = await this.updateProductsCategoryRepository.execute({
      ...data,
      where: {
        ...data.where,
        productsCategoryId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const productsCategoryUpdated =
      await this.findProductsCategoryByIdRepository.execute(productsCategoryId);
    if (!productsCategoryUpdated) {
      throw new ProductsCategoryNotFoundException();
    }
    const productsCategoryModel = this.publisher.mergeObjectContext(
      productsCategoryUpdated
    );
    productsCategoryModel.updatedProductsCategory();
    productsCategoryModel.commit();

    return productsCategoryUpdated;
  }

  private clearData(
    command: UpdateProductsCategoryCommand
  ): UpdateProductsCategoryCommand {
    return cleanObject({
      where: cleanObject({
        productsCategoryId: cleanValue(command?.where?.productsCategoryId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
