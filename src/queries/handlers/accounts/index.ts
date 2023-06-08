import { FindAccountByEmailAndAppQueryHandler } from './find-account-by-email-and-app';
import { FindAccountByIdQueryHandler } from './find-account-by-id';
import { FindAllAccountsQueryHandler } from './find-all-accounts';

export const AccountQueriesHandlers = [
  FindAccountByIdQueryHandler,
  FindAccountByEmailAndAppQueryHandler,
  FindAllAccountsQueryHandler
];
