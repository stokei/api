import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllUsageRecordsDTO } from '@/dtos/usage-records/find-all-usage-records.dto';
import { UsageRecordMapper } from '@/mappers/usage-records';
import { UsageRecordModel } from '@/models/usage-record.model';

@Injectable()
export class FindAllUsageRecordsRepository
  implements
    IBaseRepository<FindAllUsageRecordsDTO, Promise<UsageRecordModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllUsageRecordsDTO): Promise<UsageRecordModel[]> {
    const usageRecordMapper = new UsageRecordMapper();
    return usageRecordMapper.toModels(
      await this.model.usageRecord.findMany(
        usageRecordMapper.toFindAllPrisma(data)
      )
    );
  }
}
