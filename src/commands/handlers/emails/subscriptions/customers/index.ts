import { SendSubscriptionsCustomersSubscriptionActivatedEmailCommandHandler } from './send-subscription-activated-email';
import { SendSubscriptionsCustomersSubscriptionCanceledEmailCommandHandler } from './send-subscription-canceled-email';

export const SubscriptionsCustomersEmailCommandHandlers = [
  SendSubscriptionsCustomersSubscriptionActivatedEmailCommandHandler,
  SendSubscriptionsCustomersSubscriptionCanceledEmailCommandHandler
];
