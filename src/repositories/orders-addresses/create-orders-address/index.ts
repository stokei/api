import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { OrdersAddressMapper } from '@/mappers/orders-addresses';
import { CreateOrdersAddressDTO } from '@/dtos/orders-addresses/create-orders-address.dto';
import { OrdersAddressModel } from '@/models/orders-address.model';

@Injectable()
export class CreateOrdersAddressRepository
  implements
    IBaseRepository<CreateOrdersAddressDTO, Promise<OrdersAddressModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateOrdersAddressDTO): Promise<OrdersAddressModel> {
    return new OrdersAddressMapper().toModel(
      await this.model.ordersAddress.create({ data })
    );
  }
}
