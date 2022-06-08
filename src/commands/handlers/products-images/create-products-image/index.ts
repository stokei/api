import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductsImageCommand } from '@/commands/implements/products-images/create-products-image.command';
import {
  ProductsImageNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateProductsImageRepository } from '@/repositories/products-images/create-products-image';
import { cleanObject, cleanValue } from '@stokei/nestjs';

type CreateProductsImageCommandKeys = keyof CreateProductsImageCommand;

@CommandHandler(CreateProductsImageCommand)
export class CreateProductsImageCommandHandler
  implements ICommandHandler<CreateProductsImageCommand>
{
  constructor(
    private readonly createProductsImageRepository: CreateProductsImageRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateProductsImageCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateProductsImageCommandKeys>(
        'parent'
      );
    }

    const productsImageCreated =
      await this.createProductsImageRepository.execute(data);
    if (!productsImageCreated) {
      throw new ProductsImageNotFoundException();
    }
    const productsImageModel =
      this.publisher.mergeObjectContext(productsImageCreated);
    productsImageModel.createdProductsImage();
    productsImageModel.commit();

    return productsImageCreated;
  }

  private clearData(
    command: CreateProductsImageCommand
  ): CreateProductsImageCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
