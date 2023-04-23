import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { RecurringMapper } from '@/mappers/recurrings';
import { RecurringModel } from '@/models/recurring.model';
import { FindAllRecurringsQuery } from '@/queries/implements/recurrings/find-all-recurrings.query';
import { CountRecurringsRepository } from '@/repositories/recurrings/count-recurrings';
import { FindAllRecurringsRepository } from '@/repositories/recurrings/find-all-recurrings';

@QueryHandler(FindAllRecurringsQuery)
export class FindAllRecurringsQueryHandler
  implements IQueryHandler<FindAllRecurringsQuery>
{
  constructor(
    private readonly findAllRecurringRepository: FindAllRecurringsRepository,
    private readonly countRecurringsRepository: CountRecurringsRepository
  ) {}

  async execute(
    query: FindAllRecurringsQuery
  ): Promise<IPaginatedType<RecurringModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new RecurringMapper().toFindAllQueryClean(query);
    const recurrings = await this.findAllRecurringRepository.execute(data);
    const totalCount = await this.countRecurringsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<RecurringModel>().toPaginationList({
      items: recurrings,
      page: data.page,
      totalCount
    });
  }
}
