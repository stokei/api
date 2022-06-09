import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsPricesDTO } from '@/dtos/prices/exists-prices.dto';

@Injectable()
export class ExistsPricesRepository
  implements IBaseRepository<ExistsPricesDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsPricesDTO): Promise<boolean> {
    return (await this.model.price.count({ where })) > 0;
  }
}
