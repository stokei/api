import { ActivateDomainRepository } from './activate-domain';
import { CountDomainsRepository } from './count-domains';
import { CreateDomainRepository } from './create-domain';
import { ExistsDomainsRepository } from './exists-domains';
import { FindAllDomainsRepository } from './find-all-domains';
import { FindDomainByIdRepository } from './find-domain-by-id';
import { FindDomainByNameRepository } from './find-domain-by-name';
import { RemoveDomainRepository } from './remove-domain';

export const DomainsRepositories = [
  CountDomainsRepository,
  CreateDomainRepository,
  ExistsDomainsRepository,
  FindDomainByIdRepository,
  FindAllDomainsRepository,
  RemoveDomainRepository,
  FindDomainByNameRepository,
  ActivateDomainRepository
];
