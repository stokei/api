import { MeAccountAccessesResolver } from './accesses';
import { MeAccountAppResolver } from './app';
import { MeAccountCreatedByResolver } from './created-by';
import { MeAccountReferenceResolver } from './reference';
import { MeAccountUpdatedByResolver } from './updated-by';

export const MeAccountsFieldsResolvers = [
  MeAccountReferenceResolver,
  MeAccountAccessesResolver,
  MeAccountAppResolver,
  MeAccountCreatedByResolver,
  MeAccountUpdatedByResolver
];
