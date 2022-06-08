import { PhoneCreatedHandler } from './phone-created.handler';
import { PhoneUpdatedHandler } from './phone-updated.handler';
import { PhoneRemovedHandler } from './phone-removed.handler';

export const PhoneEventsHandlers = [
  PhoneCreatedHandler,
  PhoneUpdatedHandler,
  PhoneRemovedHandler
];
