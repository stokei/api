import { MeAccountAccessesResolver } from './accesses';
import { AccountReferenceResolver } from './reference';

export const AccountsFieldsResolvers = [
  AccountReferenceResolver,
  MeAccountAccessesResolver
];
