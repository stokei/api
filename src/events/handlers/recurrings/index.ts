import { RecurringCreatedHandler } from './recurring-created.handler';
import { RecurringRemovedHandler } from './recurring-removed.handler';

export const RecurringEventsHandlers = [
  RecurringCreatedHandler,
  RecurringRemovedHandler
];
