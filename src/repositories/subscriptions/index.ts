import { CountSubscriptionsRepository } from './count-subscriptions';
import { CreateSubscriptionRepository } from './create-subscription';
import { ExistsSubscriptionsRepository } from './exists-subscriptions';
import { FindAllSubscriptionsRepository } from './find-all-subscriptions';
import { FindSubscriptionByIdRepository } from './find-subscription-by-id';
import { UpdateSubscriptionRepository } from './update-subscription';

export const SubscriptionsRepositories = [
  CountSubscriptionsRepository,
  CreateSubscriptionRepository,
  ExistsSubscriptionsRepository,
  FindSubscriptionByIdRepository,
  FindAllSubscriptionsRepository,
  UpdateSubscriptionRepository
];
