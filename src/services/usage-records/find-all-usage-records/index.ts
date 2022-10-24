import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllUsageRecordsDTO } from '@/dtos/usage-records/find-all-usage-records.dto';
import { UsageRecordModel } from '@/models/usage-record.model';
import { FindAllUsageRecordsQuery } from '@/queries/implements/usage-records/find-all-usage-records.query';

@Injectable()
export class FindAllUsageRecordsService
  implements
    IBaseService<
      FindAllUsageRecordsDTO,
      Promise<IPaginatedType<UsageRecordModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllUsageRecordsDTO
  ): Promise<IPaginatedType<UsageRecordModel>> {
    return await this.queryBus.execute(new FindAllUsageRecordsQuery(data));
  }
}
