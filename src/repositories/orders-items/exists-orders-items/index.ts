import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsOrdersItemsDTO } from '@/dtos/orders-items/exists-orders-items.dto';

@Injectable()
export class ExistsOrdersItemsRepository
  implements IBaseRepository<ExistsOrdersItemsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsOrdersItemsDTO): Promise<boolean> {
    return (await this.model.ordersItem.count({ where })) > 0;
  }
}
