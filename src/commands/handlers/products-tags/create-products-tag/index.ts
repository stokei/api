import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductsTagCommand } from '@/commands/implements/products-tags/create-products-tag.command';
import {
  ProductsTagNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateProductsTagRepository } from '@/repositories/products-tags/create-products-tag';
import { cleanObject, cleanValue } from '@stokei/nestjs';

type CreateProductsTagCommandKeys = keyof CreateProductsTagCommand;

@CommandHandler(CreateProductsTagCommand)
export class CreateProductsTagCommandHandler
  implements ICommandHandler<CreateProductsTagCommand>
{
  constructor(
    private readonly createProductsTagRepository: CreateProductsTagRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateProductsTagCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateProductsTagCommandKeys>('parent');
    }

    const productsTagCreated = await this.createProductsTagRepository.execute(
      data
    );
    if (!productsTagCreated) {
      throw new ProductsTagNotFoundException();
    }
    const productsTagModel =
      this.publisher.mergeObjectContext(productsTagCreated);
    productsTagModel.createdProductsTag();
    productsTagModel.commit();

    return productsTagCreated;
  }

  private clearData(
    command: CreateProductsTagCommand
  ): CreateProductsTagCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
