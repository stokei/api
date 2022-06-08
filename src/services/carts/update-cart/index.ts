import { UpdateCartCommand } from '@/commands/implements/carts/update-cart.command';
import { UpdateCartDTO } from '@/dtos/carts/update-cart.dto';
import { CartModel } from '@/models/cart.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdateCartService
  implements IBaseService<UpdateCartDTO, Promise<CartModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateCartDTO): Promise<CartModel> {
    return await this.commandBus.execute(new UpdateCartCommand(data));
  }
}
