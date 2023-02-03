import { MeAccountAccessesResolver } from './accesses';
import { MeAccountAppResolver } from './app';
import { MeAccountAvatarResolver } from './avatar';
import { MeAccountCreatedByResolver } from './created-by';
import { MeAccountIsAdminResolver } from './is-admin';
import { MeAccountPhonesResolver } from './phones';
import { MeAccountReferenceResolver } from './reference';
import { MeAccountUpdatedByResolver } from './updated-by';

export const MeAccountsFieldsResolvers = [
  MeAccountReferenceResolver,
  MeAccountAccessesResolver,
  MeAccountAppResolver,
  MeAccountPhonesResolver,
  MeAccountAvatarResolver,
  MeAccountCreatedByResolver,
  MeAccountIsAdminResolver,
  MeAccountUpdatedByResolver
];
