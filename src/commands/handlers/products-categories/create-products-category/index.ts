import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateProductsCategoryCommand } from '@/commands/implements/products-categories/create-products-category.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  ProductsCategoryNotFoundException
} from '@/errors';
import { CreateProductsCategoryRepository } from '@/repositories/products-categories/create-products-category';

type CreateProductsCategoryCommandKeys = keyof CreateProductsCategoryCommand;

@CommandHandler(CreateProductsCategoryCommand)
export class CreateProductsCategoryCommandHandler
  implements ICommandHandler<CreateProductsCategoryCommand>
{
  constructor(
    private readonly createProductsCategoryRepository: CreateProductsCategoryRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateProductsCategoryCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateProductsCategoryCommandKeys>(
        'parent'
      );
    }

    const productsCategoryCreated =
      await this.createProductsCategoryRepository.execute(data);
    if (!productsCategoryCreated) {
      throw new ProductsCategoryNotFoundException();
    }
    const productsCategoryModel = this.publisher.mergeObjectContext(
      productsCategoryCreated
    );
    productsCategoryModel.createdProductsCategory();
    productsCategoryModel.commit();

    return productsCategoryCreated;
  }

  private clearData(
    command: CreateProductsCategoryCommand
  ): CreateProductsCategoryCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
