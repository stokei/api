import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';

@Injectable()
export class SumUsageRecordByParentRepository
  implements IBaseRepository<string, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(parent: string): Promise<number> {
    const now = new Date(Date.now());
    const firstDayMonth = new Date(Date.now());
    firstDayMonth.setDate(1);
    firstDayMonth.setHours(0);
    firstDayMonth.setMinutes(0);
    firstDayMonth.setSeconds(0);

    const response = await this.model.usageRecord.groupBy({
      by: ['parent'],
      where: {
        AND: {
          parent: {
            equals: parent
          }
        },
        OR: [{ createdAt: { lte: now, gte: firstDayMonth } }]
      },
      _sum: {
        quantity: true
      }
    });
    return response?.[0]?._sum?.quantity || 0;
  }
}
