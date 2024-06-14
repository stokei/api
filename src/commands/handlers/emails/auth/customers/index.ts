import { SendAuthCustomersAccountConfigurationPendingEmailCommandHandler } from './send-account-configuration-pending-email';
import { SendAuthCustomersForgotPasswordEmailCommandHandler } from './send-forgot-password-email';
import { SendAuthCustomersUpdateOwnPasswordEmailCommandHandler } from './send-update-own-password-email';

export const AuthCustomersEmailCommandHandlers = [
  SendAuthCustomersAccountConfigurationPendingEmailCommandHandler,
  SendAuthCustomersForgotPasswordEmailCommandHandler,
  SendAuthCustomersUpdateOwnPasswordEmailCommandHandler
];
