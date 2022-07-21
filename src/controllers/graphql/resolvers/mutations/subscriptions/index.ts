import { CreateSubscriptionResolver } from './create-subscription';
import { UpdateSubscriptionResolver } from './update-subscription';

export const SubscriptionsMutations = [
  CreateSubscriptionResolver,
  UpdateSubscriptionResolver
];
