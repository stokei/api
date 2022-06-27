import { CreateSubscriptionResolver } from './create-subscription';
import { RemoveSubscriptionResolver } from './remove-subscription';
import { UpdateSubscriptionResolver } from './update-subscription';

export const SubscriptionsMutations = [
  CreateSubscriptionResolver,
  RemoveSubscriptionResolver,
  UpdateSubscriptionResolver
];
