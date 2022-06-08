import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveProductsTagCommand } from '@/commands/implements/products-tags/remove-products-tag.command';
import {
  ProductsTagNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindProductsTagByIdRepository } from '@/repositories/products-tags/find-products-tag-by-id';
import { RemoveProductsTagRepository } from '@/repositories/products-tags/remove-products-tag';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveProductsTagCommandKeys = keyof RemoveProductsTagCommand;

@CommandHandler(RemoveProductsTagCommand)
export class RemoveProductsTagCommandHandler
  implements ICommandHandler<RemoveProductsTagCommand>
{
  constructor(
    private readonly findProductsTagByIdRepository: FindProductsTagByIdRepository,
    private readonly removeProductsTagRepository: RemoveProductsTagRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveProductsTagCommand) {
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

    const removed = await this.removeProductsTagRepository.execute({
      where: {
        productsTagId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const productsTagModel = this.publisher.mergeObjectContext(productsTag);
    productsTagModel.removedProductsTag();
    productsTagModel.commit();

    return productsTag;
  }

  private clearData(
    command: RemoveProductsTagCommand
  ): RemoveProductsTagCommand {
    return cleanObject({
      where: cleanObject({
        productsTagId: cleanValue(command?.where?.productsTagId)
      })
    });
  }
}
