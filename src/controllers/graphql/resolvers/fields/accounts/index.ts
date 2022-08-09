import { AccountAppResolver } from './app';
import { AccountCreatedByResolver } from './created-by';
import { MeAccountsFieldsResolvers } from './me';
import { AccountReferenceResolver } from './reference';
import { AccountUpdatedByResolver } from './updated-by';

export const AccountsFieldsResolvers = [
  ...MeAccountsFieldsResolvers,
  AccountReferenceResolver,
  AccountAppResolver,
  AccountCreatedByResolver,
  AccountUpdatedByResolver
];
