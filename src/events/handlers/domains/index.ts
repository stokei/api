import { DomainCreatedHandler } from './domain-created.handler';
import { DomainUpdatedHandler } from './domain-updated.handler';
import { DomainRemovedHandler } from './domain-removed.handler';

export const DomainEventsHandlers = [
  DomainCreatedHandler,
  DomainUpdatedHandler,
  DomainRemovedHandler
];
