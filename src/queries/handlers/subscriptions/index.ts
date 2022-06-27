import { FindAllSubscriptionsQueryHandler } from './find-all-subscriptions';
import { FindSubscriptionByIdQueryHandler } from './find-subscription-by-id';

export const SubscriptionQueriesHandlers = [
  FindSubscriptionByIdQueryHandler,
  FindAllSubscriptionsQueryHandler
];
