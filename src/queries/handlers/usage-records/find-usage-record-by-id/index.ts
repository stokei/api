import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  UsageRecordNotFoundException
} from '@/errors';
import { UsageRecordModel } from '@/models/usage-record.model';
import { FindUsageRecordByIdQuery } from '@/queries/implements/usage-records/find-usage-record-by-id.query';
import { FindUsageRecordByIdRepository } from '@/repositories/usage-records/find-usage-record-by-id';

@QueryHandler(FindUsageRecordByIdQuery)
export class FindUsageRecordByIdQueryHandler
  implements IQueryHandler<FindUsageRecordByIdQuery>
{
  constructor(
    private readonly findUsageRecordByIdRepository: FindUsageRecordByIdRepository
  ) {}

  async execute(query: FindUsageRecordByIdQuery): Promise<UsageRecordModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const usageRecord = await this.findUsageRecordByIdRepository.execute(id);
    if (!usageRecord) {
      throw new UsageRecordNotFoundException();
    }
    return usageRecord;
  }
}
