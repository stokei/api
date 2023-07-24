import { ActivateSubscriptionContractService } from './activate-subscription-contract';
import { CancelSubscriptionContractService } from './cancel-subscription-contract';
import { CreateSubscriptionContractService } from './create-subscription-contract';
import { CreateSubscriptionContractByAdminService } from './create-subscription-contract-by-admin';
import { FindAllSubscriptionContractsService } from './find-all-subscription-contracts';
import { FindAllSubscriptionContractsByItemService } from './find-all-subscription-contracts-by-item';
import { FindSubscriptionContractByIdService } from './find-subscription-contract-by-id';
import { FindSubscriptionContractByStripeCheckoutSessionService } from './find-subscription-contract-by-stripe-checkout-session';
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
  ActivateSubscriptionContractService,
  CancelSubscriptionContractService,
  CreateSubscriptionContractByAdminService,
  FindSubscriptionContractByStripeCheckoutSessionService,
  FindAllSubscriptionContractsByItemService
];
