import { SubscriptionCreatedHandler } from './subscription-created.handler';
import { SubscriptionUpdatedHandler } from './subscription-updated.handler';

export const SubscriptionEventsHandlers = [
  SubscriptionCreatedHandler,
  SubscriptionUpdatedHandler
];
