import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, cleanValueNumber } from '@stokei/nestjs';

import { CreateCartItemCommand } from '@/commands/implements/cart-items/create-cart-item.command';
import {
  CartItemNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException,
  ProductNotFoundException
} from '@/errors';
import { CartItemAlreadyExistsException } from '@/errors/cart-item-already-exists';
import { CreateCartItemRepository } from '@/repositories/cart-items/create-cart-item';
import { ExistsCartItemsRepository } from '@/repositories/cart-items/exists-cart-items';
import { FindPriceByIdService } from '@/services/prices/find-price-by-id';

type CreateCartItemCommandKeys = keyof CreateCartItemCommand;

@CommandHandler(CreateCartItemCommand)
export class CreateCartItemCommandHandler
  implements ICommandHandler<CreateCartItemCommand>
{
  constructor(
    private readonly createCartItemRepository: CreateCartItemRepository,
    private readonly existsCartItemsRepository: ExistsCartItemsRepository,
    private readonly findPriceByIdService: FindPriceByIdService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateCartItemCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateCartItemCommandKeys>('parent');
    }
    if (!data?.product) {
      throw new ParamNotFoundException<CreateCartItemCommandKeys>('product');
    }
    if (!data?.price) {
      throw new ParamNotFoundException<CreateCartItemCommandKeys>('price');
    }
    if (!data?.quantity || data?.quantity < 0) {
      data.quantity = 1;
    }
    const existsItem = await this.existsCartItemsRepository.execute({
      where: {
        parent: data.parent,
        price: data.price
      }
    });
    if (!existsItem) {
      throw new CartItemAlreadyExistsException();
    }
    const price = await this.findPriceByIdService.execute(data.price);
    if (!price || !price.active) {
      throw new PriceNotFoundException();
    }
    if (price.parent !== data.product) {
      throw new ProductNotFoundException();
    }

    const cartItemCreated = await this.createCartItemRepository.execute(data);
    if (!cartItemCreated) {
      throw new CartItemNotFoundException();
    }
    const cartItemModel = this.publisher.mergeObjectContext(cartItemCreated);
    cartItemModel.createdCartItem({
      createdBy: data.createdBy
    });
    cartItemModel.commit();

    return cartItemCreated;
  }

  private clearData(command: CreateCartItemCommand): CreateCartItemCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      parent: cleanValue(command?.parent),
      product: cleanValue(command?.product),
      price: cleanValue(command?.price),
      quantity: cleanValueNumber(command?.quantity)
    });
  }
}
