import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UsageRecordModel } from '@/models/usage-record.model';
import { FindUsageRecordByIdQuery } from '@/queries/implements/usage-records/find-usage-record-by-id.query';

@Injectable()
export class FindUsageRecordByIdService
  implements IBaseService<string, Promise<UsageRecordModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<UsageRecordModel> {
    return await this.queryBus.execute(new FindUsageRecordByIdQuery(data));
  }
}
