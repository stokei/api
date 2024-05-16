import { AccessResolver } from './access';
import { AccessesResolver } from './accesses';
import { AccessesFrequencyByPeriodResolver } from './accesses-frequency-by-period';
import { AccessesHoursByPeriodResolver } from './accesses-hours-by-period';

export const AccessesQueries = [
  AccessResolver,
  AccessesResolver,
  AccessesFrequencyByPeriodResolver,
  AccessesHoursByPeriodResolver
];
