import { AccountCreatedHandler } from './account-created.handler';
import { AccountRemovedHandler } from './account-removed.handler';
import { AccountUpdatedHandler } from './account-updated.handler';

export const AccountEventsHandlers = [
  AccountCreatedHandler,
  AccountUpdatedHandler,
  AccountRemovedHandler
];
