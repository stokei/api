import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateCartItemCommand } from '@/commands/implements/cart-items/create-cart-item.command';
import { CreateCartItemDTO } from '@/dtos/cart-items/create-cart-item.dto';
import { CartItemModel } from '@/models/cart-item.model';

@Injectable()
export class CreateCartItemService
  implements IBaseService<CreateCartItemDTO, Promise<CartItemModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateCartItemDTO): Promise<CartItemModel> {
    return await this.commandBus.execute(new CreateCartItemCommand(data));
  }
}
