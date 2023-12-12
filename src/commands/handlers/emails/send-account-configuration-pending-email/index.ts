import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { SendAccountConfigurationPendingEmailCommand } from '@/commands/implements/emails/send-account-configuration-pending-email.command';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { SendEmailService } from '@/services/emails/send-email';

type SendAccountConfigurationPendingEmailCommandKeys =
  keyof SendAccountConfigurationPendingEmailCommand;

@CommandHandler(SendAccountConfigurationPendingEmailCommand)
export class SendAccountConfigurationPendingEmailCommandHandler
  implements ICommandHandler<SendAccountConfigurationPendingEmailCommand>
{
  private readonly logger = new Logger(
    SendAccountConfigurationPendingEmailCommandHandler.name
  );
  constructor(
    private readonly sendEmailService: SendEmailService,
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  async execute(command: SendAccountConfigurationPendingEmailCommand) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.app) {
        throw new ParamNotFoundException<SendAccountConfigurationPendingEmailCommandKeys>(
          'app'
        );
      }
      if (!data?.toAccount) {
        throw new ParamNotFoundException<SendAccountConfigurationPendingEmailCommandKeys>(
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
        route: '/emails/user-created-with-configuration-pending',
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
    command: SendAccountConfigurationPendingEmailCommand
  ): SendAccountConfigurationPendingEmailCommand {
    return cleanObject({
      toAccount: cleanValue(command?.toAccount),
      app: cleanValue(command?.app),
      plainTextPassword: cleanValue(command?.plainTextPassword),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
