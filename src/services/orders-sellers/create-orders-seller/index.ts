import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateOrdersSellerCommand } from '@/commands/implements/orders-sellers/create-orders-seller.command';
import { CreateOrdersSellerDTO } from '@/dtos/orders-sellers/create-orders-seller.dto';
import { OrdersSellerModel } from '@/models/orders-seller.model';

@Injectable()
export class CreateOrdersSellerService
  implements IBaseService<CreateOrdersSellerDTO, Promise<OrdersSellerModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateOrdersSellerDTO): Promise<OrdersSellerModel> {
    return await this.commandBus.execute(new CreateOrdersSellerCommand(data));
  }
}
