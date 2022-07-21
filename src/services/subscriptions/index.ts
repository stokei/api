import { CreateSubscriptionService } from './create-subscription';
import { FindAllSubscriptionsService } from './find-all-subscriptions';
import { FindSubscriptionByIdService } from './find-subscription-by-id';
import { UpdateSubscriptionService } from './update-subscription';

export const SubscriptionServices = [
  CreateSubscriptionService,
  UpdateSubscriptionService,
  FindSubscriptionByIdService,
  FindAllSubscriptionsService
];
