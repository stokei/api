import { FindAllSubscriptionContractsQueryHandler } from './find-all-subscription-contracts';
import { FindSubscriptionContractByIdQueryHandler } from './find-subscription-contract-by-id';
import { FindSubscriptionContractByStripeCheckoutSessionQueryHandler } from './find-subscription-contract-by-stripe-checkout-session';
import { FindSubscriptionContractByStripeSubscriptionQueryHandler } from './find-subscription-contract-by-stripe-subscription';

export const SubscriptionContractQueriesHandlers = [
  FindSubscriptionContractByIdQueryHandler,
  FindAllSubscriptionContractsQueryHandler,
  FindSubscriptionContractByStripeSubscriptionQueryHandler,
  FindSubscriptionContractByStripeCheckoutSessionQueryHandler
];
