import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveCartItemCommand } from '@/commands/implements/cart-items/remove-cart-item.command';
import {
  CartItemNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCartItemByIdRepository } from '@/repositories/cart-items/find-cart-item-by-id';
import { RemoveCartItemRepository } from '@/repositories/cart-items/remove-cart-item';

type RemoveCartItemCommandKeys = keyof RemoveCartItemCommand;

@CommandHandler(RemoveCartItemCommand)
export class RemoveCartItemCommandHandler
  implements ICommandHandler<RemoveCartItemCommand>
{
  constructor(
    private readonly findCartItemByIdRepository: FindCartItemByIdRepository,
    private readonly removeCartItemRepository: RemoveCartItemRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveCartItemCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const cartItemId = splitServiceId(data.where?.cartItemId)?.id;
    if (!cartItemId) {
      throw new ParamNotFoundException('cartItemId');
    }

    const cartItem = await this.findCartItemByIdRepository.execute(cartItemId);
    if (!cartItem) {
      throw new CartItemNotFoundException();
    }

    const removed = await this.removeCartItemRepository.execute({
      where: {
        ...data.where,
        cartItemId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const cartItemModel = this.publisher.mergeObjectContext(cartItem);
    cartItemModel.removedCartItem({
      removedBy: data.where.removedBy
    });
    cartItemModel.commit();

    return cartItem;
  }

  private clearData(command: RemoveCartItemCommand): RemoveCartItemCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        cartItemId: cleanValue(command?.where?.cartItemId)
      })
    });
  }
}
