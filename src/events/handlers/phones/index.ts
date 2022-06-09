import { PhoneCreatedHandler } from './phone-created.handler';
import { PhoneRemovedHandler } from './phone-removed.handler';
import { PhoneUpdatedHandler } from './phone-updated.handler';

export const PhoneEventsHandlers = [
  PhoneCreatedHandler,
  PhoneUpdatedHandler,
  PhoneRemovedHandler
];
