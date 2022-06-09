import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsCheckoutsDTO } from '@/dtos/checkouts/exists-checkouts.dto';

@Injectable()
export class ExistsCheckoutsRepository
  implements IBaseRepository<ExistsCheckoutsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsCheckoutsDTO): Promise<boolean> {
    return (await this.model.checkout.count({ where })) > 0;
  }
}
