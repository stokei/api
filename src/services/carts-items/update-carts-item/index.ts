import { UpdateCartsItemCommand } from '@/commands/implements/carts-items/update-carts-item.command';
import { UpdateCartsItemDTO } from '@/dtos/carts-items/update-carts-item.dto';
import { CartsItemModel } from '@/models/carts-item.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdateCartsItemService
  implements IBaseService<UpdateCartsItemDTO, Promise<CartsItemModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateCartsItemDTO): Promise<CartsItemModel> {
    return await this.commandBus.execute(new UpdateCartsItemCommand(data));
  }
}
