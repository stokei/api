import { CreateDomainResolver } from './create-domain';
import { RemoveDomainResolver } from './remove-domain';

export const DomainsMutations = [CreateDomainResolver, RemoveDomainResolver];
