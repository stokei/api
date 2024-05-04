import { ActivateDomainCommandHandler } from './activate-domain';
import { CreateDomainCommandHandler } from './create-domain';
import { RemoveDomainCommandHandler } from './remove-domain';

export const DomainCommandHandlers = [
  CreateDomainCommandHandler,
  RemoveDomainCommandHandler,
  ActivateDomainCommandHandler
];
