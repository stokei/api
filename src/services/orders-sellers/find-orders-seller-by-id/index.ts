import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { OrdersSellerModel } from '@/models/orders-seller.model';
import { FindOrdersSellerByIdQuery } from '@/queries/implements/orders-sellers/find-orders-seller-by-id.query';

@Injectable()
export class FindOrdersSellerByIdService
  implements IBaseService<string, Promise<OrdersSellerModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<OrdersSellerModel> {
    return await this.queryBus.execute(new FindOrdersSellerByIdQuery(data));
  }
}
