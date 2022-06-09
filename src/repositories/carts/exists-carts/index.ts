import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsCartsDTO } from '@/dtos/carts/exists-carts.dto';

@Injectable()
export class ExistsCartsRepository
  implements IBaseRepository<ExistsCartsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsCartsDTO): Promise<boolean> {
    return (await this.model.cart.count({ where })) > 0;
  }
}
