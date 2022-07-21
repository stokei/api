import { CountSubscriptionsRepository } from './count-subscriptions';
import { CreateSubscriptionRepository } from './create-subscription';
import { FindAllSubscriptionsRepository } from './find-all-subscriptions';
import { FindSubscriptionByIdRepository } from './find-subscription-by-id';
import { UpdateSubscriptionRepository } from './update-subscription';

export const SubscriptionsRepositories = [
  CountSubscriptionsRepository,
  CreateSubscriptionRepository,
  FindSubscriptionByIdRepository,
  FindAllSubscriptionsRepository,
  UpdateSubscriptionRepository
];
