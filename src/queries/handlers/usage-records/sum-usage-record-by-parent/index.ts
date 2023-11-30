import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue } from '@stokei/nestjs';

import { DataNotFoundException, ParamNotFoundException } from '@/errors';
import { SumUsageRecordByParentQuery } from '@/queries/implements/usage-records/sum-usage-record-by-parent.query';
import { SumUsageRecordByParentRepository } from '@/repositories/usage-records/sum-usage-record-by-parent';

@QueryHandler(SumUsageRecordByParentQuery)
export class SumUsageRecordByParentQueryHandler
  implements IQueryHandler<SumUsageRecordByParentQuery>
{
  constructor(
    private readonly sumUsageRecordByParentRepository: SumUsageRecordByParentRepository
  ) {}

  async execute(query: SumUsageRecordByParentQuery): Promise<number> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const parent = cleanValue(query.parent);
    if (!parent) {
      throw new ParamNotFoundException('parent');
    }

    const usageRecord =
      await this.sumUsageRecordByParentRepository.execute(parent);
    return usageRecord || 0;
  }
}
