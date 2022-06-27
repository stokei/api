import { CreateSubscriptionCommandHandler } from './create-subscription';
import { RemoveSubscriptionCommandHandler } from './remove-subscription';
import { UpdateSubscriptionCommandHandler } from './update-subscription';

export const SubscriptionCommandHandlers = [
  CreateSubscriptionCommandHandler,
  RemoveSubscriptionCommandHandler,
  UpdateSubscriptionCommandHandler
];
