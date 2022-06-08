import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '@/commands/implements/products/create-product.command';
import {
  ProductNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateProductRepository } from '@/repositories/products/create-product';
import { cleanObject, cleanValue } from '@stokei/nestjs';

type CreateProductCommandKeys = keyof CreateProductCommand;

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    private readonly createProductRepository: CreateProductRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateProductCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateProductCommandKeys>('parent');
    }

    const productCreated = await this.createProductRepository.execute(data);
    if (!productCreated) {
      throw new ProductNotFoundException();
    }
    const productModel = this.publisher.mergeObjectContext(productCreated);
    productModel.createdProduct();
    productModel.commit();

    return productCreated;
  }

  private clearData(command: CreateProductCommand): CreateProductCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
