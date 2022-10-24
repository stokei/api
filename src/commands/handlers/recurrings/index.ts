import { CreateRecurringCommandHandler } from './create-recurring';
import { RemoveRecurringCommandHandler } from './remove-recurring';

export const RecurringCommandHandlers = [
  CreateRecurringCommandHandler,
  RemoveRecurringCommandHandler
];
