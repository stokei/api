import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateCartCommand } from '@/commands/implements/carts/create-cart.command';
import { CreateCartDTO } from '@/dtos/carts/create-cart.dto';
import { CartModel } from '@/models/cart.model';

@Injectable()
export class CreateCartService
  implements IBaseService<CreateCartDTO, Promise<CartModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateCartDTO): Promise<CartModel> {
    return await this.commandBus.execute(new CreateCartCommand(data));
  }
}
