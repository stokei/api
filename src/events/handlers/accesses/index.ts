import { AccessCreatedHandler } from './access-created.handler';
import { AccessUpdatedHandler } from './access-updated.handler';
import { AccessRemovedHandler } from './access-removed.handler';

export const AccessEventsHandlers = [
  AccessCreatedHandler,
  AccessUpdatedHandler,
  AccessRemovedHandler
];
