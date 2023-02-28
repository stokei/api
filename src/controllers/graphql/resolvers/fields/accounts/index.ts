import { AccountAppResolver } from './app';
import { AccountAvatarResolver } from './avatar';
import { AccountCreatedByResolver } from './created-by';
import { AccountIsOwnerResolver } from './is-owner';
import { MeAccountsFieldsResolvers } from './me';
import { AccountReferenceResolver } from './reference';
import { AccountUpdatedByResolver } from './updated-by';

export const AccountsFieldsResolvers = [
  ...MeAccountsFieldsResolvers,
  AccountReferenceResolver,
  AccountAppResolver,
  AccountAvatarResolver,
  AccountCreatedByResolver,
  AccountUpdatedByResolver,
  AccountIsOwnerResolver
];
