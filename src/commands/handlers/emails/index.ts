import { SendEmailCommandHandler } from './send-email';
import { SendForgotPasswordEmailCommandHandler } from './send-forgot-password-email';

export const EmailCommandHandlers = [
  SendEmailCommandHandler,
  SendForgotPasswordEmailCommandHandler
];
