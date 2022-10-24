import { CreateRecurringService } from './create-recurring';
import { FindAllRecurringsService } from './find-all-recurrings';
import { FindRecurringByIdService } from './find-recurring-by-id';
import { RemoveRecurringService } from './remove-recurring';
import { UpdateRecurringService } from './update-recurring';

export const RecurringServices = [
  CreateRecurringService,
  RemoveRecurringService,
  UpdateRecurringService,
  FindRecurringByIdService,
  FindAllRecurringsService
];
