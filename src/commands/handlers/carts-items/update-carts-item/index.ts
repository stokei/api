import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateCartsItemCommand } from '@/commands/implements/carts-items/update-carts-item.command';
import {
  CartsItemNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCartsItemByIdRepository } from '@/repositories/carts-items/find-carts-item-by-id';
import { UpdateCartsItemRepository } from '@/repositories/carts-items/update-carts-item';

type UpdateCartsItemCommandKeys = keyof UpdateCartsItemCommand;

@CommandHandler(UpdateCartsItemCommand)
export class UpdateCartsItemCommandHandler
  implements ICommandHandler<UpdateCartsItemCommand>
{
  constructor(
    private readonly findCartsItemByIdRepository: FindCartsItemByIdRepository,
    private readonly updateCartsItemRepository: UpdateCartsItemRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateCartsItemCommand) {
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

    const updated = await this.updateCartsItemRepository.execute({
      ...data,
      where: {
        ...data.where,
        cartsItemId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const cartsItemUpdated = await this.findCartsItemByIdRepository.execute(
      cartsItemId
    );
    if (!cartsItemUpdated) {
      throw new CartsItemNotFoundException();
    }
    const cartsItemModel = this.publisher.mergeObjectContext(cartsItemUpdated);
    cartsItemModel.updatedCartsItem();
    cartsItemModel.commit();

    return cartsItemUpdated;
  }

  private clearData(command: UpdateCartsItemCommand): UpdateCartsItemCommand {
    return cleanObject({
      where: cleanObject({
        cartsItemId: cleanValue(command?.where?.cartsItemId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
