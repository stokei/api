import { DomainCreatedHandler } from './domain-created.handler';
import { DomainRemovedHandler } from './domain-removed.handler';
import { DomainUpdatedHandler } from './domain-updated.handler';

export const DomainEventsHandlers = [
  DomainCreatedHandler,
  DomainUpdatedHandler,
  DomainRemovedHandler
];
