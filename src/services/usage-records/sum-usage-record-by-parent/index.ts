import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { SumUsageRecordByParentQuery } from '@/queries/implements/usage-records/sum-usage-record-by-parent.query';

@Injectable()
export class SumUsageRecordByParentService
  implements IBaseService<string, Promise<number>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<number> {
    return await this.queryBus.execute(new SumUsageRecordByParentQuery(data));
  }
}
