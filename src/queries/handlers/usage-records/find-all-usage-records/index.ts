import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { UsageRecordMapper } from '@/mappers/usage-records';
import { UsageRecordModel } from '@/models/usage-record.model';
import { FindAllUsageRecordsQuery } from '@/queries/implements/usage-records/find-all-usage-records.query';
import { CountUsageRecordsRepository } from '@/repositories/usage-records/count-usage-records';
import { FindAllUsageRecordsRepository } from '@/repositories/usage-records/find-all-usage-records';

@QueryHandler(FindAllUsageRecordsQuery)
export class FindAllUsageRecordsQueryHandler
  implements IQueryHandler<FindAllUsageRecordsQuery>
{
  constructor(
    private readonly findAllUsageRecordRepository: FindAllUsageRecordsRepository,
    private readonly countUsageRecordsRepository: CountUsageRecordsRepository
  ) {}

  async execute(
    query: FindAllUsageRecordsQuery
  ): Promise<IPaginatedType<UsageRecordModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new UsageRecordMapper().toFindAllQueryClean(query);
    const usageRecords = await this.findAllUsageRecordRepository.execute(data);
    const totalCount = await this.countUsageRecordsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<UsageRecordModel>().toPaginationList({
      items: usageRecords,
      page: data.page,
      totalCount
    });
  }
}
