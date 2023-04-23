import { ActivateSubscriptionContractItemsCommandHandler } from './activate-subscription-contract-items';
import { CancelSubscriptionContractItemsCommandHandler } from './cancel-subscription-contract-items';
import { CreateSubscriptionContractItemCommandHandler } from './create-subscription-contract-item';
import { RemoveSubscriptionContractItemCommandHandler } from './remove-subscription-contract-item';
import { UpdateSubscriptionContractItemCommandHandler } from './update-subscription-contract-item';

export const SubscriptionContractItemCommandHandlers = [
  CreateSubscriptionContractItemCommandHandler,
  RemoveSubscriptionContractItemCommandHandler,
  UpdateSubscriptionContractItemCommandHandler,
  ActivateSubscriptionContractItemsCommandHandler,
  CancelSubscriptionContractItemsCommandHandler
];
