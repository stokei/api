import { ActivateSubscriptionContractResolver } from './activate-subscription-contract';
import { CancelSubscriptionContractResolver } from './cancel-subscription-contract';
import { CreateSubscriptionContractResolver } from './create-subscription-contract';
import { UpdateSubscriptionContractResolver } from './update-subscription-contract';

export const SubscriptionContractsMutations = [
  UpdateSubscriptionContractResolver,
  CancelSubscriptionContractResolver,
  CreateSubscriptionContractResolver,
  ActivateSubscriptionContractResolver
];
