import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateProductCommand } from '@/commands/implements/products/update-product.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  ProductNotFoundException
} from '@/errors';
import { FindProductByIdRepository } from '@/repositories/products/find-product-by-id';
import { UpdateProductRepository } from '@/repositories/products/update-product';

type UpdateProductCommandKeys = keyof UpdateProductCommand;

@CommandHandler(UpdateProductCommand)
export class UpdateProductCommandHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(
    private readonly findProductByIdRepository: FindProductByIdRepository,
    private readonly updateProductRepository: UpdateProductRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateProductCommand) {
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

    const updated = await this.updateProductRepository.execute({
      ...data,
      where: {
        ...data.where,
        productId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const productUpdated = await this.findProductByIdRepository.execute(
      productId
    );
    if (!productUpdated) {
      throw new ProductNotFoundException();
    }
    const productModel = this.publisher.mergeObjectContext(productUpdated);
    productModel.updatedProduct();
    productModel.commit();

    return productUpdated;
  }

  private clearData(command: UpdateProductCommand): UpdateProductCommand {
    return cleanObject({
      where: cleanObject({
        productId: cleanValue(command?.where?.productId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
