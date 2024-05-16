import { IQuery } from '@nestjs/cqrs';

import { FindAccessesFrequencyByPeriodDTO } from '@/dtos/accesses/find-accesses-frequency-by-period.dto';

export class FindAccessesFrequencyByPeriodQuery
  implements IQuery, FindAccessesFrequencyByPeriodDTO
{
  app: string;
  startAt: string;
  endAt: string;

  constructor(data: FindAccessesFrequencyByPeriodDTO) {
    this.app = data.app;
    this.startAt = data.startAt;
    this.endAt = data.endAt;
  }
}
