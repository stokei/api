import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateCartCommand } from '@/commands/implements/carts/update-cart.command';
import {
  CartNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCartByIdRepository } from '@/repositories/carts/find-cart-by-id';
import { UpdateCartRepository } from '@/repositories/carts/update-cart';

type UpdateCartCommandKeys = keyof UpdateCartCommand;

@CommandHandler(UpdateCartCommand)
export class UpdateCartCommandHandler
  implements ICommandHandler<UpdateCartCommand>
{
  constructor(
    private readonly findCartByIdRepository: FindCartByIdRepository,
    private readonly updateCartRepository: UpdateCartRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateCartCommand) {
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

    const updated = await this.updateCartRepository.execute({
      ...data,
      where: {
        ...data.where,
        cartId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const cartUpdated = await this.findCartByIdRepository.execute(cartId);
    if (!cartUpdated) {
      throw new CartNotFoundException();
    }
    const cartModel = this.publisher.mergeObjectContext(cartUpdated);
    cartModel.updatedCart();
    cartModel.commit();

    return cartUpdated;
  }

  private clearData(command: UpdateCartCommand): UpdateCartCommand {
    return cleanObject({
      where: cleanObject({
        cartId: cleanValue(command?.where?.cartId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
