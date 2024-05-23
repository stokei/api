import { CreateAccessService } from './create-access';
import { FindAccessByIdService } from './find-access-by-id';
import { FindAccessesFrequencyByPeriodService } from './find-accesses-frequency-by-period';
import { FindAccessesHoursByPeriodService } from './find-accesses-hours-by-period';
import { FindAllAccessesService } from './find-all-accesses';
import { RefreshAccessService } from './refresh-access';
import { RemoveAccessService } from './remove-access';

export const AccessServices = [
  CreateAccessService,
  RemoveAccessService,
  RefreshAccessService,
  FindAccessByIdService,
  FindAllAccessesService,
  FindAccessesFrequencyByPeriodService,
  FindAccessesHoursByPeriodService
];
