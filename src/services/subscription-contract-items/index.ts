import { CreateSubscriptionContractItemService } from './create-subscription-contract-item';
import { FindAllSubscriptionContractItemsService } from './find-all-subscription-contract-items';
import { FindAllSubscriptionContractItemsBySubscriptionService } from './find-all-subscription-contract-items-by-subscription';
import { FindSubscriptionContractItemByIdService } from './find-subscription-contract-item-by-id';
import { FindSubscriptionContractItemProductService } from './find-subscription-contract-item-product';
import { RemoveSubscriptionContractItemService } from './remove-subscription-contract-item';
import { UpdateSubscriptionContractItemService } from './update-subscription-contract-item';

export const SubscriptionContractItemServices = [
  CreateSubscriptionContractItemService,
  RemoveSubscriptionContractItemService,
  UpdateSubscriptionContractItemService,
  FindSubscriptionContractItemByIdService,
  FindAllSubscriptionContractItemsService,
  FindSubscriptionContractItemProductService,
  FindAllSubscriptionContractItemsBySubscriptionService
];
