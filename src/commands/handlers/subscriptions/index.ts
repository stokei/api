import { CreateSubscriptionCommandHandler } from './create-subscription';
import { UpdateSubscriptionCommandHandler } from './update-subscription';

export const SubscriptionCommandHandlers = [
  CreateSubscriptionCommandHandler,
  UpdateSubscriptionCommandHandler
];
