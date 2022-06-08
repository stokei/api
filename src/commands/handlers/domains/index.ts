import { CreateDomainCommandHandler } from './create-domain';
import { RemoveDomainCommandHandler } from './remove-domain';
import { UpdateDomainCommandHandler } from './update-domain';

export const DomainCommandHandlers = [
  CreateDomainCommandHandler,
  RemoveDomainCommandHandler,
  UpdateDomainCommandHandler
];
