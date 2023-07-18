import { AccountCreatedHandler } from './account-created.handler';
import { AccountRemovedHandler } from './account-removed.handler';
import { AccountUpdatedHandler } from './account-updated.handler';
import { PasswordChangedHandler } from './password-changed.handler';
import { PasswordForgottenHandler } from './password-forgotten.handler';
import { UpdateOwnPasswordCreatedHandler } from './update-own-password-created.handler';

export const AccountEventsHandlers = [
  AccountCreatedHandler,
  AccountUpdatedHandler,
  AccountRemovedHandler,
  PasswordChangedHandler,
  PasswordForgottenHandler,
  UpdateOwnPasswordCreatedHandler
];
