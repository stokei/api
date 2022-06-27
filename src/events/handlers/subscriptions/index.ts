import { SubscriptionCreatedHandler } from './subscription-created.handler';
import { SubscriptionRemovedHandler } from './subscription-removed.handler';
import { SubscriptionUpdatedHandler } from './subscription-updated.handler';

export const SubscriptionEventsHandlers = [
  SubscriptionCreatedHandler,
  SubscriptionUpdatedHandler,
  SubscriptionRemovedHandler
];
