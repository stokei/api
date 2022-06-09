import { AccessCreatedHandler } from './access-created.handler';
import { AccessRemovedHandler } from './access-removed.handler';
import { AccessUpdatedHandler } from './access-updated.handler';

export const AccessEventsHandlers = [
  AccessCreatedHandler,
  AccessUpdatedHandler,
  AccessRemovedHandler
];
