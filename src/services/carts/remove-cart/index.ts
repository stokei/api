import { RemoveCartCommand } from '@/commands/implements/carts/remove-cart.command';
import { RemoveCartDTO } from '@/dtos/carts/remove-cart.dto';
import { CartModel } from '@/models/cart.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveCartService
  implements IBaseService<RemoveCartDTO, Promise<CartModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveCartDTO): Promise<CartModel> {
    return await this.commandBus.execute(new RemoveCartCommand(data));
  }
}
