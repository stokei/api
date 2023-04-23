import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UsageRecordMapper } from '@/mappers/usage-records';
import { UsageRecordModel } from '@/models/usage-record.model';

@Injectable()
export class FindUsageRecordByIdRepository
  implements IBaseRepository<string, Promise<UsageRecordModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<UsageRecordModel> {
    return new UsageRecordMapper().toModel(
      await this.model.usageRecord.findUnique({
        where: { id }
      })
    );
  }
}
