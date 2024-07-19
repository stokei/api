import { ActivateSubscriptionContractRepository } from './activate-subscription-contract';
import { CancelSubscriptionContractRepository } from './cancel-subscription-contract';
import { CountSubscriptionContractsRepository } from './count-subscription-contracts';
import { CountSubscriptionContractsByItemRepository } from './count-subscription-contracts-by-item';
import { CreateSubscriptionContractRepository } from './create-subscription-contract';
import { ExpiresSubscriptionContractRepository } from './expires-subscription-contract';
import { FindAllSubscriptionContractsRepository } from './find-all-subscription-contracts';
import { FindAllSubscriptionContractsByItemRepository } from './find-all-subscription-contracts-by-item';
import { FindSubscriptionContractByIdRepository } from './find-subscription-contract-by-id';
import { UpdateSubscriptionContractRepository } from './update-subscription-contract';

export const SubscriptionContractsRepositories = [
  CountSubscriptionContractsRepository,
  CreateSubscriptionContractRepository,
  FindSubscriptionContractByIdRepository,
  FindAllSubscriptionContractsRepository,
  UpdateSubscriptionContractRepository,
  ActivateSubscriptionContractRepository,
  CancelSubscriptionContractRepository,
  FindAllSubscriptionContractsByItemRepository,
  CountSubscriptionContractsByItemRepository,
  ExpiresSubscriptionContractRepository
];
