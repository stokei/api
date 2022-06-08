import { CreateDomainResolver } from './create-domain';
import { RemoveDomainResolver } from './remove-domain';
import { UpdateDomainResolver } from './update-domain';

export const DomainsMutations = [
  CreateDomainResolver,
  RemoveDomainResolver,
  UpdateDomainResolver
];
