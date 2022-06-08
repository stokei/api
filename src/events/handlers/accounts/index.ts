import { AccountCreatedHandler } from './account-created.handler';
import { AccountUpdatedHandler } from './account-updated.handler';
import { AccountRemovedHandler } from './account-removed.handler';

export const AccountEventsHandlers = [
  AccountCreatedHandler,
  AccountUpdatedHandler,
  AccountRemovedHandler
];
