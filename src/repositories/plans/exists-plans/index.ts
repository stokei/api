import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsPlansDTO } from '@/dtos/plans/exists-plans.dto';

@Injectable()
export class ExistsPlansRepository
  implements IBaseRepository<ExistsPlansDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsPlansDTO): Promise<boolean> {
    return (await this.model.plan.count({ where })) > 0;
  }
}
