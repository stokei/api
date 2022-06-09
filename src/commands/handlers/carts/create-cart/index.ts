import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateCartCommand } from '@/commands/implements/carts/create-cart.command';
import {
  CartNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateCartRepository } from '@/repositories/carts/create-cart';

type CreateCartCommandKeys = keyof CreateCartCommand;

@CommandHandler(CreateCartCommand)
export class CreateCartCommandHandler
  implements ICommandHandler<CreateCartCommand>
{
  constructor(
    private readonly createCartRepository: CreateCartRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateCartCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateCartCommandKeys>('parent');
    }

    const cartCreated = await this.createCartRepository.execute(data);
    if (!cartCreated) {
      throw new CartNotFoundException();
    }
    const cartModel = this.publisher.mergeObjectContext(cartCreated);
    cartModel.createdCart();
    cartModel.commit();

    return cartCreated;
  }

  private clearData(command: CreateCartCommand): CreateCartCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
