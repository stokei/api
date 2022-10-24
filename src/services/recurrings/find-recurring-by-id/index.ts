import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RecurringModel } from '@/models/recurring.model';
import { FindRecurringByIdQuery } from '@/queries/implements/recurrings/find-recurring-by-id.query';

@Injectable()
export class FindRecurringByIdService
  implements IBaseService<string, Promise<RecurringModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<RecurringModel> {
    return await this.queryBus.execute(new FindRecurringByIdQuery(data));
  }
}
