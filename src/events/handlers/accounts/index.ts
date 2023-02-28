import { AccountCreatedHandler } from './account-created.handler';
import { AccountRemovedHandler } from './account-removed.handler';
import { AccountRoleCreatedHandler } from './account-role-created.handler';
import { AccountRoleRemovedHandler } from './account-role-removed.handler';
import { AccountUpdatedHandler } from './account-updated.handler';
import { PasswordChangedHandler } from './password-changed.handler';
import { PasswordForgottenHandler } from './password-forgotten.handler';

export const AccountEventsHandlers = [
  AccountCreatedHandler,
  AccountUpdatedHandler,
  AccountRemovedHandler,
  PasswordChangedHandler,
  PasswordForgottenHandler,
  AccountRoleCreatedHandler,
  AccountRoleRemovedHandler
];
