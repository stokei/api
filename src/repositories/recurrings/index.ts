import { CountRecurringsRepository } from './count-recurrings';
import { CreateRecurringRepository } from './create-recurring';
import { FindAllRecurringsRepository } from './find-all-recurrings';
import { FindRecurringByIdRepository } from './find-recurring-by-id';
import { RemoveRecurringRepository } from './remove-recurring';

export const RecurringsRepositories = [
  CountRecurringsRepository,
  CreateRecurringRepository,
  FindRecurringByIdRepository,
  FindAllRecurringsRepository,
  RemoveRecurringRepository
];
