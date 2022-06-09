import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsOrdersDTO } from '@/dtos/orders/exists-orders.dto';

@Injectable()
export class ExistsOrdersRepository
  implements IBaseRepository<ExistsOrdersDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsOrdersDTO): Promise<boolean> {
    return (await this.model.order.count({ where })) > 0;
  }
}
