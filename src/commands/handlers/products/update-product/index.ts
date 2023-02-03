import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateProductCommand } from '@/commands/implements/products/update-product.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  ProductNotFoundException
} from '@/errors';
import { ProductModel } from '@/models/product.model';
import { UpdateProductRepository } from '@/repositories/products/update-product';
import { FindProductByIdService } from '@/services/products/find-product-by-id';

@CommandHandler(UpdateProductCommand)
export class UpdateProductCommandHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(
    private readonly findProductByIdService: FindProductByIdService,
    private readonly updateProductRepository: UpdateProductRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateProductCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const productId = splitServiceId(data.where?.product)?.id;
    if (!productId) {
      throw new ParamNotFoundException('productId');
    }

    const product = await this.findProductByIdService.execute(productId);
    if (!product) {
      throw new ProductNotFoundException();
    }

    const dataUpdate = data.data;
    const updated = await this.updateProductRepository.execute({
      data: dataUpdate,
      where: {
        ...data.where,
        product: productId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const productUpdated = new ProductModel({ ...dataUpdate, ...product });
    if (!productUpdated) {
      throw new ProductNotFoundException();
    }
    const productModel = this.publisher.mergeObjectContext(productUpdated);
    productModel.updatedProduct({
      updatedBy: data.data.updatedBy
    });
    productModel.commit();

    return productUpdated;
  }

  private clearData(command: UpdateProductCommand): UpdateProductCommand {
    return cleanObject({
      where: cleanObject({
        app: cleanValue(command?.where?.app),
        product: cleanValue(command?.where?.product)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        description: cleanValue(command?.data?.description),
        defaultPrice: cleanValue(command?.data?.defaultPrice),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
