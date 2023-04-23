import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateUsageRecordDTO } from '@/dtos/usage-records/create-usage-record.dto';
import { UsageRecordMapper } from '@/mappers/usage-records';
import { UsageRecordModel } from '@/models/usage-record.model';

@Injectable()
export class CreateUsageRecordRepository
  implements IBaseRepository<CreateUsageRecordDTO, Promise<UsageRecordModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateUsageRecordDTO): Promise<UsageRecordModel> {
    return new UsageRecordMapper().toModel(
      await this.model.usageRecord.create({ data })
    );
  }
}
