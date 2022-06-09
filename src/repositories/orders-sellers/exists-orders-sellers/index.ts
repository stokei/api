import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsOrdersSellersDTO } from '@/dtos/orders-sellers/exists-orders-sellers.dto';

@Injectable()
export class ExistsOrdersSellersRepository
  implements IBaseRepository<ExistsOrdersSellersDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsOrdersSellersDTO): Promise<boolean> {
    return (await this.model.ordersSeller.count({ where })) > 0;
  }
}
