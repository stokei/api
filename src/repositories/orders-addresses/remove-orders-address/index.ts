import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveOrdersAddressDTO } from '@/dtos/orders-addresses/remove-orders-address.dto';

@Injectable()
export class RemoveOrdersAddressRepository
  implements IBaseRepository<RemoveOrdersAddressDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveOrdersAddressDTO): Promise<boolean> {
    const removed = await this.model.ordersAddress.delete({
      where: {
        id: where?.ordersAddressId
      }
    });
    return !!removed;
  }
}
