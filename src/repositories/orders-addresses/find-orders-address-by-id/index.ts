import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { OrdersAddressMapper } from '@/mappers/orders-addresses';
import { OrdersAddressModel } from '@/models/orders-address.model';

@Injectable()
export class FindOrdersAddressByIdRepository
  implements IBaseRepository<string, Promise<OrdersAddressModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<OrdersAddressModel> {
    return new OrdersAddressMapper().toModel(
      await this.model.ordersAddress.findUnique({
        where: { id }
      })
    );
  }
}
