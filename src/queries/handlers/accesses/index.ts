import { FindAccessByIdQueryHandler } from './find-access-by-id';
import { FindAccessesFrequencyByPeriodQueryHandler } from './find-accesses-frequency-by-period';
import { FindAccessesHoursByPeriodQueryHandler } from './find-accesses-hours-by-period';
import { FindAllAccessesQueryHandler } from './find-all-accesses';

export const AccessQueriesHandlers = [
  FindAccessByIdQueryHandler,
  FindAllAccessesQueryHandler,
  FindAccessesFrequencyByPeriodQueryHandler,
  FindAccessesHoursByPeriodQueryHandler
];
