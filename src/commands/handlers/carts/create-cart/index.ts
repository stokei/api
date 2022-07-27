import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateCartCommand } from '@/commands/implements/carts/create-cart.command';
import { CartNotFoundException, DataNotFoundException } from '@/errors';
import { CreateCartRepository } from '@/repositories/carts/create-cart';

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

    const cartCreated = await this.createCartRepository.execute(data);
    if (!cartCreated) {
      throw new CartNotFoundException();
    }
    const cartModel = this.publisher.mergeObjectContext(cartCreated);
    cartModel.createdCart({
      createdBy: data.createdBy
    });
    cartModel.commit();

    return cartCreated;
  }

  private clearData(command: CreateCartCommand): CreateCartCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app)
    });
  }
}
