import { SendAccountConfigurationPendingEmailCommandHandler } from './send-account-configuration-pending-email';
import { SendEmailCommandHandler } from './send-email';
import { SendForgotPasswordEmailCommandHandler } from './send-forgot-password-email';
import { SendUpdateOwnPasswordEmailCommandHandler } from './send-update-own-password-email';

export const EmailCommandHandlers = [
  SendEmailCommandHandler,
  SendForgotPasswordEmailCommandHandler,
  SendAccountConfigurationPendingEmailCommandHandler,
  SendUpdateOwnPasswordEmailCommandHandler
];
