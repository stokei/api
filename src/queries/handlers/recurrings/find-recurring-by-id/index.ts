import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  RecurringNotFoundException
} from '@/errors';
import { RecurringModel } from '@/models/recurring.model';
import { FindRecurringByIdQuery } from '@/queries/implements/recurrings/find-recurring-by-id.query';
import { FindRecurringByIdRepository } from '@/repositories/recurrings/find-recurring-by-id';

@QueryHandler(FindRecurringByIdQuery)
export class FindRecurringByIdQueryHandler
  implements IQueryHandler<FindRecurringByIdQuery>
{
  constructor(
    private readonly findRecurringByIdRepository: FindRecurringByIdRepository
  ) {}

  async execute(query: FindRecurringByIdQuery): Promise<RecurringModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const recurring = await this.findRecurringByIdRepository.execute(id);
    if (!recurring) {
      throw new RecurringNotFoundException();
    }
    return recurring;
  }
}
