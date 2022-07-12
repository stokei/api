import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveCartItemCommand } from '@/commands/implements/cart-items/remove-cart-item.command';
import { RemoveCartItemDTO } from '@/dtos/cart-items/remove-cart-item.dto';
import { CartItemModel } from '@/models/cart-item.model';

@Injectable()
export class RemoveCartItemService
  implements IBaseService<RemoveCartItemDTO, Promise<CartItemModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveCartItemDTO): Promise<CartItemModel> {
    return await this.commandBus.execute(new RemoveCartItemCommand(data));
  }
}
