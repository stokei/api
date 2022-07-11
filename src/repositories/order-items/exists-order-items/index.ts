import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsOrderItemsDTO } from '@/dtos/order-items/exists-order-items.dto';

@Injectable()
export class ExistsOrderItemsRepository
  implements IBaseRepository<ExistsOrderItemsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsOrderItemsDTO): Promise<boolean> {
    return (await this.model.orderItem.count({ where })) > 0;
  }
}
