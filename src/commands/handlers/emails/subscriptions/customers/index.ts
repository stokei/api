import { SendSubscriptionsCustomersSubscriptionActivatedEmailCommandHandler } from './send-subscription-activated-email';
import { SendSubscriptionsCustomersSubscriptionCanceledEmailCommandHandler } from './send-subscription-canceled-email';
import { SendSubscriptionsCustomersSubscriptionExpiredEmailCommandHandler } from './send-subscription-expired-email';

export const SubscriptionsCustomersEmailCommandHandlers = [
  SendSubscriptionsCustomersSubscriptionActivatedEmailCommandHandler,
  SendSubscriptionsCustomersSubscriptionCanceledEmailCommandHandler,
  SendSubscriptionsCustomersSubscriptionExpiredEmailCommandHandler
];
