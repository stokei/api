import { CreateDomainService } from './create-domain';
import { FindAllDomainsService } from './find-all-domains';
import { FindDomainByIdService } from './find-domain-by-id';
import { FindDomainByNameService } from './find-domain-by-name';
import { RemoveDomainService } from './remove-domain';

export const DomainServices = [
  CreateDomainService,
  RemoveDomainService,
  FindDomainByIdService,
  FindAllDomainsService,
  FindDomainByNameService
];
