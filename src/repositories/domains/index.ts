import { CountDomainsRepository } from './count-domains';
import { CreateDomainRepository } from './create-domain';
import { ExistsDomainsRepository } from './exists-domains';
import { FindAllDomainsRepository } from './find-all-domains';
import { FindDomainByIdRepository } from './find-domain-by-id';
import { RemoveDomainRepository } from './remove-domain';
import { UpdateDomainRepository } from './update-domain';

export const DomainsRepositories = [
  CountDomainsRepository,
  CreateDomainRepository,
  ExistsDomainsRepository,
  FindDomainByIdRepository,
  FindAllDomainsRepository,
  RemoveDomainRepository,
  UpdateDomainRepository
];
