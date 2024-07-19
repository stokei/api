import { ActivateSubscriptionContractCommandHandler } from './activate-subscription-contract';
import { CancelSubscriptionContractCommandHandler } from './cancel-subscription-contract';
import { CreateSubscriptionContractCommandHandler } from './create-subscription-contract';
import { CreateSubscriptionContractByAdminCommandHandler } from './create-subscription-contract-by-admin';
import { ExpiresSubscriptionContractCommandHandler } from './expires-subscription-contract';
import { UpdateSubscriptionContractCommandHandler } from './update-subscription-contract';

export const SubscriptionContractCommandHandlers = [
  CreateSubscriptionContractCommandHandler,
  UpdateSubscriptionContractCommandHandler,
  ActivateSubscriptionContractCommandHandler,
  CancelSubscriptionContractCommandHandler,
  CreateSubscriptionContractByAdminCommandHandler,
  ExpiresSubscriptionContractCommandHandler
];
