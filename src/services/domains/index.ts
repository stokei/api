import { CreateDomainService } from './create-domain';
import { FindAllDomainsService } from './find-all-domains';
import { FindDomainByIdService } from './find-domain-by-id';
import { RemoveDomainService } from './remove-domain';
import { UpdateDomainService } from './update-domain';

export const DomainServices = [
  CreateDomainService,
  RemoveDomainService,
  UpdateDomainService,
  FindDomainByIdService,
  FindAllDomainsService
];
