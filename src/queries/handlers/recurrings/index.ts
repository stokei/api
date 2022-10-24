import { FindAllRecurringsQueryHandler } from './find-all-recurrings';
import { FindRecurringByIdQueryHandler } from './find-recurring-by-id';

export const RecurringQueriesHandlers = [
  FindRecurringByIdQueryHandler,
  FindAllRecurringsQueryHandler
];
