import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllRecurringsDTO } from '@/dtos/recurrings/find-all-recurrings.dto';
import { RecurringModel } from '@/models/recurring.model';
import { FindAllRecurringsQuery } from '@/queries/implements/recurrings/find-all-recurrings.query';

@Injectable()
export class FindAllRecurringsService
  implements
    IBaseService<FindAllRecurringsDTO, Promise<IPaginatedType<RecurringModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllRecurringsDTO
  ): Promise<IPaginatedType<RecurringModel>> {
    return await this.queryBus.execute(new FindAllRecurringsQuery(data));
  }
}
