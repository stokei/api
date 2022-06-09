import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateProductsImageCommand } from '@/commands/implements/products-images/update-products-image.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  ProductsImageNotFoundException
} from '@/errors';
import { FindProductsImageByIdRepository } from '@/repositories/products-images/find-products-image-by-id';
import { UpdateProductsImageRepository } from '@/repositories/products-images/update-products-image';

type UpdateProductsImageCommandKeys = keyof UpdateProductsImageCommand;

@CommandHandler(UpdateProductsImageCommand)
export class UpdateProductsImageCommandHandler
  implements ICommandHandler<UpdateProductsImageCommand>
{
  constructor(
    private readonly findProductsImageByIdRepository: FindProductsImageByIdRepository,
    private readonly updateProductsImageRepository: UpdateProductsImageRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateProductsImageCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const productsImageId = splitServiceId(data.where?.productsImageId)?.id;
    if (!productsImageId) {
      throw new ParamNotFoundException('productsImageId');
    }

    const productsImage = await this.findProductsImageByIdRepository.execute(
      productsImageId
    );
    if (!productsImage) {
      throw new ProductsImageNotFoundException();
    }

    const updated = await this.updateProductsImageRepository.execute({
      ...data,
      where: {
        ...data.where,
        productsImageId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const productsImageUpdated =
      await this.findProductsImageByIdRepository.execute(productsImageId);
    if (!productsImageUpdated) {
      throw new ProductsImageNotFoundException();
    }
    const productsImageModel =
      this.publisher.mergeObjectContext(productsImageUpdated);
    productsImageModel.updatedProductsImage();
    productsImageModel.commit();

    return productsImageUpdated;
  }

  private clearData(
    command: UpdateProductsImageCommand
  ): UpdateProductsImageCommand {
    return cleanObject({
      where: cleanObject({
        productsImageId: cleanValue(command?.where?.productsImageId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
