import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';

@Injectable()
export class SumUsageRecordByParentRepository
  implements IBaseRepository<string, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(parent: string): Promise<number> {
    const response = await this.model.usageRecord.groupBy({
      by: ['parent'],
      where: {
        parent
      },
      _sum: {
        quantity: true
      }
    });
    return response?.[0]?._sum?.quantity || 0;
  }
}
