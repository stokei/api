import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateCartsItemCommand } from '@/commands/implements/carts-items/create-carts-item.command';
import { CreateCartsItemDTO } from '@/dtos/carts-items/create-carts-item.dto';
import { CartsItemModel } from '@/models/carts-item.model';

@Injectable()
export class CreateCartsItemService
  implements IBaseService<CreateCartsItemDTO, Promise<CartsItemModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateCartsItemDTO): Promise<CartsItemModel> {
    return await this.commandBus.execute(new CreateCartsItemCommand(data));
  }
}
