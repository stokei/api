import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountUsageRecordsDTO } from '@/dtos/usage-records/count-usage-records.dto';
import { UsageRecordMapper } from '@/mappers/usage-records';

@Injectable()
export class CountUsageRecordsRepository
  implements IBaseRepository<CountUsageRecordsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountUsageRecordsDTO): Promise<number> {
    const usageRecordMapper = new UsageRecordMapper();
    return await this.model.usageRecord.count({
      where: usageRecordMapper.toWhereFindAllPrisma(where)
    });
  }
}
