import { DomainCreatedHandler } from './domain-created.handler';
import { DomainRemovedHandler } from './domain-removed.handler';

export const DomainEventsHandlers = [
  DomainCreatedHandler,
  DomainRemovedHandler
];
