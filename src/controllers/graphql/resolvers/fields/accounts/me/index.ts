import { MeAccountAccessesResolver } from './accesses';
import { MeAccountAppResolver } from './app';
import { MeAccountAvatarResolver } from './avatar';
import { MeAccountCreatedByResolver } from './created-by';
import { MeAccountDocumentResolver } from './document';
import { MeAccountIsOwnerResolver } from './is-owner';
import { MeAccountPhoneResolver } from './phone';
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
  MeAccountUpdatedByResolver,
  MeAccountIsOwnerResolver,
  MeAccountDocumentResolver,
  MeAccountPhoneResolver
];
