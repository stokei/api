import { SubscriptionContractActivatedHandler } from './subscription-contract-actvated.handler';
import { SubscriptionContractCreatedHandler } from './subscription-contract-created.handler';
import { SubscriptionContractUpdatedHandler } from './subscription-contract-updated.handler';

export const SubscriptionContractEventsHandlers = [
  SubscriptionContractCreatedHandler,
  SubscriptionContractUpdatedHandler,
  SubscriptionContractActivatedHandler
];
