import { ActivateSubscriptionContractRepository } from './activate-subscription-contract';
import { CancelSubscriptionContractRepository } from './cancel-subscription-contract';
import { CountSubscriptionContractsRepository } from './count-subscription-contracts';
import { CountSubscriptionContractsByItemRepository } from './count-subscription-contracts-by-item';
import { CreateSubscriptionContractRepository } from './create-subscription-contract';
import { FindAllSubscriptionContractsRepository } from './find-all-subscription-contracts';
import { FindAllSubscriptionContractsByItemRepository } from './find-all-subscription-contracts-by-item';
import { FindSubscriptionContractByIdRepository } from './find-subscription-contract-by-id';
import { FindSubscriptionContractByStripeCheckoutSessionRepository } from './find-subscription-contract-by-stripe-checkout-session';
import { FindSubscriptionContractByStripeSubscriptionRepository } from './find-subscription-contract-by-stripe-subscription';
import { UpdateSubscriptionContractRepository } from './update-subscription-contract';

export const SubscriptionContractsRepositories = [
  CountSubscriptionContractsRepository,
  CreateSubscriptionContractRepository,
  FindSubscriptionContractByIdRepository,
  FindAllSubscriptionContractsRepository,
  UpdateSubscriptionContractRepository,
  FindSubscriptionContractByStripeSubscriptionRepository,
  ActivateSubscriptionContractRepository,
  CancelSubscriptionContractRepository,
  FindSubscriptionContractByStripeCheckoutSessionRepository,
  FindAllSubscriptionContractsByItemRepository,
  CountSubscriptionContractsByItemRepository
];
