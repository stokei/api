import { FindAllSubscriptionContractsQueryHandler } from './find-all-subscription-contracts';
import { FindSubscriptionContractByIdQueryHandler } from './find-subscription-contract-by-id';
import { FindSubscriptionContractByStripeSubscriptionQueryHandler } from './find-subscription-contract-by-stripe-subscription';

export const SubscriptionContractQueriesHandlers = [
  FindSubscriptionContractByIdQueryHandler,
  FindAllSubscriptionContractsQueryHandler,
  FindSubscriptionContractByStripeSubscriptionQueryHandler
];
