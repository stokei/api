import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateProductsTagCommand } from '@/commands/implements/products-tags/update-products-tag.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  ProductsTagNotFoundException
} from '@/errors';
import { FindProductsTagByIdRepository } from '@/repositories/products-tags/find-products-tag-by-id';
import { UpdateProductsTagRepository } from '@/repositories/products-tags/update-products-tag';

type UpdateProductsTagCommandKeys = keyof UpdateProductsTagCommand;

@CommandHandler(UpdateProductsTagCommand)
export class UpdateProductsTagCommandHandler
  implements ICommandHandler<UpdateProductsTagCommand>
{
  constructor(
    private readonly findProductsTagByIdRepository: FindProductsTagByIdRepository,
    private readonly updateProductsTagRepository: UpdateProductsTagRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateProductsTagCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const productsTagId = splitServiceId(data.where?.productsTagId)?.id;
    if (!productsTagId) {
      throw new ParamNotFoundException('productsTagId');
    }

    const productsTag = await this.findProductsTagByIdRepository.execute(
      productsTagId
    );
    if (!productsTag) {
      throw new ProductsTagNotFoundException();
    }

    const updated = await this.updateProductsTagRepository.execute({
      ...data,
      where: {
        ...data.where,
        productsTagId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const productsTagUpdated = await this.findProductsTagByIdRepository.execute(
      productsTagId
    );
    if (!productsTagUpdated) {
      throw new ProductsTagNotFoundException();
    }
    const productsTagModel =
      this.publisher.mergeObjectContext(productsTagUpdated);
    productsTagModel.updatedProductsTag();
    productsTagModel.commit();

    return productsTagUpdated;
  }

  private clearData(
    command: UpdateProductsTagCommand
  ): UpdateProductsTagCommand {
    return cleanObject({
      where: cleanObject({
        productsTagId: cleanValue(command?.where?.productsTagId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
