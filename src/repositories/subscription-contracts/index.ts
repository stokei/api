import { ActivateSubscriptionContractRepository } from './activate-subscription-contract';
import { CancelSubscriptionContractRepository } from './cancel-subscription-contract';
import { CountSubscriptionContractsRepository } from './count-subscription-contracts';
import { CreateSubscriptionContractRepository } from './create-subscription-contract';
import { FindAllSubscriptionContractsRepository } from './find-all-subscription-contracts';
import { FindSubscriptionContractByIdRepository } from './find-subscription-contract-by-id';
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
  CancelSubscriptionContractRepository
];
