import { CreateSubscriptionContractService } from './create-subscription-contract';
import { FindAllSubscriptionContractsService } from './find-all-subscription-contracts';
import { FindSubscriptionContractByIdService } from './find-subscription-contract-by-id';
import { UpdateSubscriptionContractService } from './update-subscription-contract';

export const SubscriptionContractServices = [
  CreateSubscriptionContractService,
  UpdateSubscriptionContractService,
  FindSubscriptionContractByIdService,
  FindAllSubscriptionContractsService
];
