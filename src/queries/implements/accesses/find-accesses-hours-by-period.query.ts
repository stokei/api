import { IQuery } from '@nestjs/cqrs';

import { FindAccessesHoursByPeriodDTO } from '@/dtos/accesses/find-accesses-hours-by-period.dto';

export class FindAccessesHoursByPeriodQuery
  implements IQuery, FindAccessesHoursByPeriodDTO
{
  app: string;
  startAt: string;
  endAt: string;

  constructor(data: FindAccessesHoursByPeriodDTO) {
    this.app = data.app;
    this.startAt = data.startAt;
    this.endAt = data.endAt;
  }
}
