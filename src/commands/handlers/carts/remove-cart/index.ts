import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveCartCommand } from '@/commands/implements/carts/remove-cart.command';
import {
  CartNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCartByIdRepository } from '@/repositories/carts/find-cart-by-id';
import { RemoveCartRepository } from '@/repositories/carts/remove-cart';

type RemoveCartCommandKeys = keyof RemoveCartCommand;

@CommandHandler(RemoveCartCommand)
export class RemoveCartCommandHandler
  implements ICommandHandler<RemoveCartCommand>
{
  constructor(
    private readonly findCartByIdRepository: FindCartByIdRepository,
    private readonly removeCartRepository: RemoveCartRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveCartCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const cartId = splitServiceId(data.where?.cartId)?.id;
    if (!cartId) {
      throw new ParamNotFoundException('cartId');
    }

    const cart = await this.findCartByIdRepository.execute(cartId);
    if (!cart) {
      throw new CartNotFoundException();
    }

    const removed = await this.removeCartRepository.execute({
      where: {
        cartId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const cartModel = this.publisher.mergeObjectContext(cart);
    cartModel.removedCart();
    cartModel.commit();

    return cart;
  }

  private clearData(command: RemoveCartCommand): RemoveCartCommand {
    return cleanObject({
      where: cleanObject({
        cartId: cleanValue(command?.where?.cartId)
      })
    });
  }
}
