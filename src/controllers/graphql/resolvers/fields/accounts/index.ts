import { MeAccountAccessesResolver } from './accesses';
import { AccountAppResolver } from './app';
import { AccountCreatedByResolver } from './created-by';
import { AccountReferenceResolver } from './reference';
import { AccountUpdatedByResolver } from './updated-by';

export const AccountsFieldsResolvers = [
  AccountReferenceResolver,
  MeAccountAccessesResolver,
  AccountAppResolver,
  AccountCreatedByResolver,
  AccountUpdatedByResolver
];
