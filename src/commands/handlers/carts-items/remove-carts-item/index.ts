import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveCartsItemCommand } from '@/commands/implements/carts-items/remove-carts-item.command';
import {
  CartsItemNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCartsItemByIdRepository } from '@/repositories/carts-items/find-carts-item-by-id';
import { RemoveCartsItemRepository } from '@/repositories/carts-items/remove-carts-item';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveCartsItemCommandKeys = keyof RemoveCartsItemCommand;

@CommandHandler(RemoveCartsItemCommand)
export class RemoveCartsItemCommandHandler
  implements ICommandHandler<RemoveCartsItemCommand>
{
  constructor(
    private readonly findCartsItemByIdRepository: FindCartsItemByIdRepository,
    private readonly removeCartsItemRepository: RemoveCartsItemRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveCartsItemCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const cartsItemId = splitServiceId(data.where?.cartsItemId)?.id;
    if (!cartsItemId) {
      throw new ParamNotFoundException('cartsItemId');
    }

    const cartsItem = await this.findCartsItemByIdRepository.execute(
      cartsItemId
    );
    if (!cartsItem) {
      throw new CartsItemNotFoundException();
    }

    const removed = await this.removeCartsItemRepository.execute({
      where: {
        cartsItemId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const cartsItemModel = this.publisher.mergeObjectContext(cartsItem);
    cartsItemModel.removedCartsItem();
    cartsItemModel.commit();

    return cartsItem;
  }

  private clearData(command: RemoveCartsItemCommand): RemoveCartsItemCommand {
    return cleanObject({
      where: cleanObject({
        cartsItemId: cleanValue(command?.where?.cartsItemId)
      })
    });
  }
}
