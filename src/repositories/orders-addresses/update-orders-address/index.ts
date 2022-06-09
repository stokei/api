import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateOrdersAddressDTO } from '@/dtos/orders-addresses/update-orders-address.dto';

@Injectable()
export class UpdateOrdersAddressRepository
  implements IBaseRepository<UpdateOrdersAddressDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateOrdersAddressDTO): Promise<boolean> {
    const updated = await this.model.ordersAddress.update({
      where: {
        id: where?.ordersAddressId
      },
      data
    });
    return !!updated;
  }
}
