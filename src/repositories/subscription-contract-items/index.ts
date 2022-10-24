import { CountSubscriptionContractItemsRepository } from './count-subscription-contract-items';
import { CreateSubscriptionContractItemRepository } from './create-subscription-contract-item';
import { FindAllSubscriptionContractItemsRepository } from './find-all-subscription-contract-items';
import { FindSubscriptionContractItemByIdRepository } from './find-subscription-contract-item-by-id';
import { RemoveSubscriptionContractItemRepository } from './remove-subscription-contract-item';
import { UpdateSubscriptionContractItemRepository } from './update-subscription-contract-item';

export const SubscriptionContractItemsRepositories = [
  CountSubscriptionContractItemsRepository,
  CreateSubscriptionContractItemRepository,
  FindSubscriptionContractItemByIdRepository,
  FindAllSubscriptionContractItemsRepository,
  RemoveSubscriptionContractItemRepository,
  UpdateSubscriptionContractItemRepository
];
