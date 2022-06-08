import { RemoveOrdersSellerCommand } from '@/commands/implements/orders-sellers/remove-orders-seller.command';
import { RemoveOrdersSellerDTO } from '@/dtos/orders-sellers/remove-orders-seller.dto';
import { OrdersSellerModel } from '@/models/orders-seller.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveOrdersSellerService
  implements IBaseService<RemoveOrdersSellerDTO, Promise<OrdersSellerModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveOrdersSellerDTO): Promise<OrdersSellerModel> {
    return await this.commandBus.execute(new RemoveOrdersSellerCommand(data));
  }
}
