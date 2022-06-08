import { RemoveCartsItemCommand } from '@/commands/implements/carts-items/remove-carts-item.command';
import { RemoveCartsItemDTO } from '@/dtos/carts-items/remove-carts-item.dto';
import { CartsItemModel } from '@/models/carts-item.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveCartsItemService
  implements IBaseService<RemoveCartsItemDTO, Promise<CartsItemModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveCartsItemDTO): Promise<CartsItemModel> {
    return await this.commandBus.execute(new RemoveCartsItemCommand(data));
  }
}
