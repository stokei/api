import { UpdateOrdersSellerCommand } from '@/commands/implements/orders-sellers/update-orders-seller.command';
import { UpdateOrdersSellerDTO } from '@/dtos/orders-sellers/update-orders-seller.dto';
import { OrdersSellerModel } from '@/models/orders-seller.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdateOrdersSellerService
  implements IBaseService<UpdateOrdersSellerDTO, Promise<OrdersSellerModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateOrdersSellerDTO): Promise<OrdersSellerModel> {
    return await this.commandBus.execute(new UpdateOrdersSellerCommand(data));
  }
}
