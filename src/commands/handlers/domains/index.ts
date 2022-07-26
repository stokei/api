import { CreateDomainCommandHandler } from './create-domain';
import { RemoveDomainCommandHandler } from './remove-domain';

export const DomainCommandHandlers = [
  CreateDomainCommandHandler,
  RemoveDomainCommandHandler
];
