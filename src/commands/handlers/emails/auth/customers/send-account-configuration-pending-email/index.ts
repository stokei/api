import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { SendAuthCustomersAccountConfigurationPendingEmailCommand } from '@/commands/implements/emails/auth/customers/send-account-configuration-pending-email.command';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { SendEmailService } from '@/services/emails/send-email';

type SendAuthCustomersAccountConfigurationPendingEmailCommandKeys =
  keyof SendAuthCustomersAccountConfigurationPendingEmailCommand;

@CommandHandler(SendAuthCustomersAccountConfigurationPendingEmailCommand)
export class SendAuthCustomersAccountConfigurationPendingEmailCommandHandler
  implements
    ICommandHandler<SendAuthCustomersAccountConfigurationPendingEmailCommand>
{
  private readonly logger = new Logger(
    SendAuthCustomersAccountConfigurationPendingEmailCommandHandler.name
  );
  constructor(
    private readonly sendEmailService: SendEmailService,
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  async execute(
    command: SendAuthCustomersAccountConfigurationPendingEmailCommand
  ) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.app) {
        throw new ParamNotFoundException<SendAuthCustomersAccountConfigurationPendingEmailCommandKeys>(
          'app'
        );
      }
      if (!data?.toAccount) {
        throw new ParamNotFoundException<SendAuthCustomersAccountConfigurationPendingEmailCommandKeys>(
          'toAccount'
        );
      }

      const toAccount = await this.findAccountByIdService.execute(
        data.toAccount
      );
      if (!toAccount) {
        throw new AppNotFoundException();
      }

      return await this.sendEmailService.execute({
        route: '/auth/customers/user-created-with-configuration-pending',
        to: toAccount.email,
        app: data.app,
        createdBy: data.createdBy,
        data: {
          user: {
            email: toAccount.email,
            password: data.plainTextPassword
          }
        }
      });
    } catch (error) {
      this.logger.error(
        `From ${data?.app} to ${data?.toAccount}: ${error?.message}`
      );
      return;
    }
  }

  private clearData(
    command: SendAuthCustomersAccountConfigurationPendingEmailCommand
  ): SendAuthCustomersAccountConfigurationPendingEmailCommand {
    return cleanObject({
      toAccount: cleanValue(command?.toAccount),
      app: cleanValue(command?.app),
      plainTextPassword: cleanValue(command?.plainTextPassword),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
