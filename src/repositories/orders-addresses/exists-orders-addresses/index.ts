import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsOrdersAddressesDTO } from '@/dtos/orders-addresses/exists-orders-addresses.dto';

@Injectable()
export class ExistsOrdersAddressesRepository
  implements IBaseRepository<ExistsOrdersAddressesDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsOrdersAddressesDTO): Promise<boolean> {
    return (await this.model.ordersAddress.count({ where })) > 0;
  }
}
