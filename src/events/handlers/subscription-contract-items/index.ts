import { SubscriptionContractItemCreatedHandler } from './subscription-contract-item-created.handler';
import { SubscriptionContractItemRemovedHandler } from './subscription-contract-item-removed.handler';
import { SubscriptionContractItemUpdatedHandler } from './subscription-contract-item-updated.handler';

export const SubscriptionContractItemEventsHandlers = [
  SubscriptionContractItemCreatedHandler,
  SubscriptionContractItemUpdatedHandler,
  SubscriptionContractItemRemovedHandler
];
