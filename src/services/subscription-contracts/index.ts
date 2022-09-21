import { ActivateSubscriptionContractService } from './activate-subscription-contract';
import { CreateSubscriptionContractService } from './create-subscription-contract';
import { FindAllSubscriptionContractsService } from './find-all-subscription-contracts';
import { FindSubscriptionContractByIdService } from './find-subscription-contract-by-id';
import { FindSubscriptionContractByStripeSubscriptionService } from './find-subscription-contract-by-stripe-subscription';
import { FindSubscriptionContractLastInvoiceService } from './find-subscription-contract-last-invoice';
import { UpdateSubscriptionContractService } from './update-subscription-contract';

export const SubscriptionContractServices = [
  CreateSubscriptionContractService,
  UpdateSubscriptionContractService,
  FindSubscriptionContractByIdService,
  FindAllSubscriptionContractsService,
  FindSubscriptionContractLastInvoiceService,
  FindSubscriptionContractByStripeSubscriptionService,
  ActivateSubscriptionContractService
];
