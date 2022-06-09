import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveProductsImageCommand } from '@/commands/implements/products-images/remove-products-image.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  ProductsImageNotFoundException
} from '@/errors';
import { FindProductsImageByIdRepository } from '@/repositories/products-images/find-products-image-by-id';
import { RemoveProductsImageRepository } from '@/repositories/products-images/remove-products-image';

type RemoveProductsImageCommandKeys = keyof RemoveProductsImageCommand;

@CommandHandler(RemoveProductsImageCommand)
export class RemoveProductsImageCommandHandler
  implements ICommandHandler<RemoveProductsImageCommand>
{
  constructor(
    private readonly findProductsImageByIdRepository: FindProductsImageByIdRepository,
    private readonly removeProductsImageRepository: RemoveProductsImageRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveProductsImageCommand) {
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

    const removed = await this.removeProductsImageRepository.execute({
      where: {
        productsImageId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const productsImageModel = this.publisher.mergeObjectContext(productsImage);
    productsImageModel.removedProductsImage();
    productsImageModel.commit();

    return productsImage;
  }

  private clearData(
    command: RemoveProductsImageCommand
  ): RemoveProductsImageCommand {
    return cleanObject({
      where: cleanObject({
        productsImageId: cleanValue(command?.where?.productsImageId)
      })
    });
  }
}
