import { ActivateSubscriptionContractCommandHandler } from './activate-subscription-contract';
import { CreateSubscriptionContractCommandHandler } from './create-subscription-contract';
import { UpdateSubscriptionContractCommandHandler } from './update-subscription-contract';

export const SubscriptionContractCommandHandlers = [
  CreateSubscriptionContractCommandHandler,
  UpdateSubscriptionContractCommandHandler,
  ActivateSubscriptionContractCommandHandler
];
