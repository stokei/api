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
import { FindAppEmailInformationsService } from '@/services/apps/find-app-email-informations';
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
    private readonly findAppEmailInformationsService: FindAppEmailInformationsService,
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
      const { app, baseAppURL, colors, logoURL } =
        await this.findAppEmailInformationsService.execute({
          app: data.app
        });

      return await this.sendEmailService.execute({
        to: toAccount.email,
        from: {
          name: app.name,
          email: app.email
        },
        app: app.id,
        subject: 'Conta criada',
        templateId: 'd-df7d516342be4a17b6243b5d3982b42f',
        createdBy: data.createdBy,
        data: {
          logoURL,
          appName: app.name,
          appEmail: app.email,
          appURL: baseAppURL,
          userEmail: toAccount.email,
          primaryColor: colors.PRIMARY
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
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
