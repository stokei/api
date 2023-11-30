import { SendAccountConfigurationPendingEmailCommandHandler } from './send-account-configuration-pending-email';
import { SendEmailCommandHandler } from './send-email';
import { SendForgotPasswordEmailCommandHandler } from './send-forgot-password-email';
import { SendOrderCreatedEmailCommandHandler } from './send-order-created-email';
import { SendPaymentErrorEmailCommandHandler } from './send-payment-error-email';
import { SendPaymentSuccessfullyEmailCommandHandler } from './send-payment-successfully-email';
import { SendSubscriptionActivatedEmailCommandHandler } from './send-subscription-activated-email';
import { SendSubscriptionCanceledEmailCommandHandler } from './send-subscription-canceled-email';
import { SendUpdateOwnPasswordEmailCommandHandler } from './send-update-own-password-email';

export const EmailCommandHandlers = [
  SendAccountConfigurationPendingEmailCommandHandler,
  SendEmailCommandHandler,
  SendForgotPasswordEmailCommandHandler,
  SendOrderCreatedEmailCommandHandler,
  SendPaymentErrorEmailCommandHandler,
  SendPaymentSuccessfullyEmailCommandHandler,
  SendSubscriptionActivatedEmailCommandHandler,
  SendSubscriptionCanceledEmailCommandHandler,
  SendUpdateOwnPasswordEmailCommandHandler
];
