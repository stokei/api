import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateCartItemCommand } from '@/commands/implements/cart-items/update-cart-item.command';
import { UpdateCartItemDTO } from '@/dtos/cart-items/update-cart-item.dto';
import { CartItemModel } from '@/models/cart-item.model';

@Injectable()
export class UpdateCartItemService
  implements IBaseService<UpdateCartItemDTO, Promise<CartItemModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateCartItemDTO): Promise<CartItemModel> {
    return await this.commandBus.execute(new UpdateCartItemCommand(data));
  }
}
