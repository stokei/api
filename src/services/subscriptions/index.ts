import { CreateSubscriptionService } from './create-subscription';
import { FindAllSubscriptionsService } from './find-all-subscriptions';
import { FindSubscriptionByIdService } from './find-subscription-by-id';
import { RemoveSubscriptionService } from './remove-subscription';
import { UpdateSubscriptionService } from './update-subscription';

export const SubscriptionServices = [
  CreateSubscriptionService,
  RemoveSubscriptionService,
  UpdateSubscriptionService,
  FindSubscriptionByIdService,
  FindAllSubscriptionsService
];
