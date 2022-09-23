import { CancelSubscriptionContractResolver } from './cancel-subscription-contract';
import { UpdateSubscriptionContractResolver } from './update-subscription-contract';

export const SubscriptionContractsMutations = [
  UpdateSubscriptionContractResolver,
  CancelSubscriptionContractResolver
];
