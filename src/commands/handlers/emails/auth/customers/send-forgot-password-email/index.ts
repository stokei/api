import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { SendAuthCustomersForgotPasswordEmailCommand } from '@/commands/implements/emails/auth/customers/send-forgot-password-email.command';
import { DataNotFoundException, ParamNotFoundException } from '@/errors';
import { SendEmailService } from '@/services/emails/send-email';

type SendAuthCustomersForgotPasswordEmailCommandKeys =
  keyof SendAuthCustomersForgotPasswordEmailCommand;

@CommandHandler(SendAuthCustomersForgotPasswordEmailCommand)
export class SendAuthCustomersForgotPasswordEmailCommandHandler
  implements ICommandHandler<SendAuthCustomersForgotPasswordEmailCommand>
{
  private readonly logger = new Logger(
    SendAuthCustomersForgotPasswordEmailCommandHandler.name
  );
  constructor(private readonly sendEmailService: SendEmailService) {}

  async execute(command: SendAuthCustomersForgotPasswordEmailCommand) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.app) {
        throw new ParamNotFoundException<SendAuthCustomersForgotPasswordEmailCommandKeys>(
          'app'
        );
      }
      if (!data?.toAccount) {
        throw new ParamNotFoundException<SendAuthCustomersForgotPasswordEmailCommandKeys>(
          'toAccount'
        );
      }

      return await this.sendEmailService.execute({
        route: '/auth/customers/forgot-password',
        to: data.toAccount.email,
        app: data.app,
        createdBy: data.createdBy,
        data: {
          forgotPasswordCode: data.toAccount.forgotPasswordCode
        }
      });
    } catch (error) {
      this.logger.error(
        `From ${data?.app} to ${data?.toAccount?.id}: ${error?.message}`
      );
      return;
    }
  }

  private clearData(
    command: SendAuthCustomersForgotPasswordEmailCommand
  ): SendAuthCustomersForgotPasswordEmailCommand {
    return cleanObject({
      toAccount: command?.toAccount,
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
