import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsSubscriptionsDTO } from '@/dtos/subscriptions/exists-subscriptions.dto';

@Injectable()
export class ExistsSubscriptionsRepository
  implements IBaseRepository<ExistsSubscriptionsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsSubscriptionsDTO): Promise<boolean> {
    return (await this.model.subscription.count({ where })) > 0;
  }
}
