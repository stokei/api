import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateCartsItemCommand } from '@/commands/implements/carts-items/create-carts-item.command';
import {
  CartsItemNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateCartsItemRepository } from '@/repositories/carts-items/create-carts-item';

type CreateCartsItemCommandKeys = keyof CreateCartsItemCommand;

@CommandHandler(CreateCartsItemCommand)
export class CreateCartsItemCommandHandler
  implements ICommandHandler<CreateCartsItemCommand>
{
  constructor(
    private readonly createCartsItemRepository: CreateCartsItemRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateCartsItemCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateCartsItemCommandKeys>('parent');
    }

    const cartsItemCreated = await this.createCartsItemRepository.execute(data);
    if (!cartsItemCreated) {
      throw new CartsItemNotFoundException();
    }
    const cartsItemModel = this.publisher.mergeObjectContext(cartsItemCreated);
    cartsItemModel.createdCartsItem({
      createdBy: data.createdBy
    });
    cartsItemModel.commit();

    return cartsItemCreated;
  }

  private clearData(command: CreateCartsItemCommand): CreateCartsItemCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
