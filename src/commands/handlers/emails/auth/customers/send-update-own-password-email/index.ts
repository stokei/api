import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { SendAuthCustomersUpdateOwnPasswordEmailCommand } from '@/commands/implements/emails/auth/customers/send-update-own-password-email.command';
import { DataNotFoundException, ParamNotFoundException } from '@/errors';
import { SendEmailService } from '@/services/emails/send-email';

type SendAuthCustomersUpdateOwnPasswordEmailCommandKeys =
  keyof SendAuthCustomersUpdateOwnPasswordEmailCommand;

@CommandHandler(SendAuthCustomersUpdateOwnPasswordEmailCommand)
export class SendAuthCustomersUpdateOwnPasswordEmailCommandHandler
  implements ICommandHandler<SendAuthCustomersUpdateOwnPasswordEmailCommand>
{
  private readonly logger = new Logger(
    SendAuthCustomersUpdateOwnPasswordEmailCommandHandler.name
  );
  constructor(private readonly sendEmailService: SendEmailService) {}

  async execute(command: SendAuthCustomersUpdateOwnPasswordEmailCommand) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.app) {
        throw new ParamNotFoundException<SendAuthCustomersUpdateOwnPasswordEmailCommandKeys>(
          'app'
        );
      }
      if (!data?.toAccount) {
        throw new ParamNotFoundException<SendAuthCustomersUpdateOwnPasswordEmailCommandKeys>(
          'toAccount'
        );
      }

      return await this.sendEmailService.execute({
        route: '/auth/customers/update-own-password',
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
    command: SendAuthCustomersUpdateOwnPasswordEmailCommand
  ): SendAuthCustomersUpdateOwnPasswordEmailCommand {
    return cleanObject({
      toAccount: command?.toAccount,
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
