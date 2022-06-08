import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveProductCommand } from '@/commands/implements/products/remove-product.command';
import {
  ProductNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindProductByIdRepository } from '@/repositories/products/find-product-by-id';
import { RemoveProductRepository } from '@/repositories/products/remove-product';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveProductCommandKeys = keyof RemoveProductCommand;

@CommandHandler(RemoveProductCommand)
export class RemoveProductCommandHandler
  implements ICommandHandler<RemoveProductCommand>
{
  constructor(
    private readonly findProductByIdRepository: FindProductByIdRepository,
    private readonly removeProductRepository: RemoveProductRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveProductCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const productId = splitServiceId(data.where?.productId)?.id;
    if (!productId) {
      throw new ParamNotFoundException('productId');
    }

    const product = await this.findProductByIdRepository.execute(productId);
    if (!product) {
      throw new ProductNotFoundException();
    }

    const removed = await this.removeProductRepository.execute({
      where: {
        productId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const productModel = this.publisher.mergeObjectContext(product);
    productModel.removedProduct();
    productModel.commit();

    return product;
  }

  private clearData(command: RemoveProductCommand): RemoveProductCommand {
    return cleanObject({
      where: cleanObject({
        productId: cleanValue(command?.where?.productId)
      })
    });
  }
}
