import { ActivateSubscriptionContractService } from './activate-subscription-contract';
import { CancelSubscriptionContractService } from './cancel-subscription-contract';
import { CreateSubscriptionContractService } from './create-subscription-contract';
import { CreateSubscriptionContractByAdminService } from './create-subscription-contract-by-admin';
import { ExpiresSubscriptionContractService } from './expires-subscription-contract';
import { FindAllSubscriptionContractsService } from './find-all-subscription-contracts';
import { FindSubscriptionContractActiveByProductService } from './find-subscription-contract-active-by-product';
import { FindSubscriptionContractByIdService } from './find-subscription-contract-by-id';
import { FindSubscriptionContractLastInvoiceService } from './find-subscription-contract-last-invoice';
import { UpdateSubscriptionContractService } from './update-subscription-contract';
import { UserHasSubscriptionContractActiveService } from './user-has-subscription-contract-active';

export const SubscriptionContractServices = [
  CreateSubscriptionContractService,
  UpdateSubscriptionContractService,
  FindSubscriptionContractByIdService,
  FindAllSubscriptionContractsService,
  FindSubscriptionContractLastInvoiceService,
  ActivateSubscriptionContractService,
  CancelSubscriptionContractService,
  CreateSubscriptionContractByAdminService,
  UserHasSubscriptionContractActiveService,
  ExpiresSubscriptionContractService,
  FindSubscriptionContractActiveByProductService
];
