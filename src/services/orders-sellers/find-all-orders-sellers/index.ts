import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { OrdersSellerModel } from '@/models/orders-seller.model';
import { FindAllOrdersSellersDTO } from '@/dtos/orders-sellers/find-all-orders-sellers.dto';
import { FindAllOrdersSellersQuery } from '@/queries/implements/orders-sellers/find-all-orders-sellers.query';

@Injectable()
export class FindAllOrdersSellersService
  implements
    IBaseService<
      FindAllOrdersSellersDTO,
      Promise<IPaginatedType<OrdersSellerModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllOrdersSellersDTO
  ): Promise<IPaginatedType<OrdersSellerModel>> {
    return await this.queryBus.execute(new FindAllOrdersSellersQuery(data));
  }
}
