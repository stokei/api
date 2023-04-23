import { FindAllDomainsQueryHandler } from './find-all-domains';
import { FindDomainByIdQueryHandler } from './find-domain-by-id';
import { FindDomainByNameQueryHandler } from './find-domain-by-name';

export const DomainQueriesHandlers = [
  FindDomainByIdQueryHandler,
  FindAllDomainsQueryHandler,
  FindDomainByNameQueryHandler
];
