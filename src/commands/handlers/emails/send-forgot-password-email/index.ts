import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { SendForgotPasswordEmailCommand } from '@/commands/implements/emails/send-forgot-password-email.command';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAppEmailInformationsService } from '@/services/apps/find-app-email-informations';
import { SendEmailService } from '@/services/emails/send-email';
import { appendPathnameToURL } from '@/utils/append-pathname-to-url';

type SendForgotPasswordEmailCommandKeys = keyof SendForgotPasswordEmailCommand;

@CommandHandler(SendForgotPasswordEmailCommand)
export class SendForgotPasswordEmailCommandHandler
  implements ICommandHandler<SendForgotPasswordEmailCommand>
{
  private readonly logger = new Logger(
    SendForgotPasswordEmailCommandHandler.name
  );
  constructor(
    private readonly sendEmailService: SendEmailService,
    private readonly findAppEmailInformationsService: FindAppEmailInformationsService,
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  async execute(command: SendForgotPasswordEmailCommand) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.app) {
        throw new ParamNotFoundException<SendForgotPasswordEmailCommandKeys>(
          'app'
        );
      }
      if (!data?.toAccount) {
        throw new ParamNotFoundException<SendForgotPasswordEmailCommandKeys>(
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

      const buttonForgotPasswordLink = appendPathnameToURL(
        baseAppURL,
        `auth/password/change?code=${toAccount.forgotPasswordCode}`
      );
      return await this.sendEmailService.execute({
        to: toAccount.email,
        from: {
          name: app.name,
          email: app.email
        },
        app: app.id,
        subject: 'Esqueceu sua senha?',
        templateId: 'd-8af9bfeb5cb34e4a8d3f0bf76a0326cf',
        createdBy: data.createdBy,
        data: {
          logoURL,
          appName: app.name,
          appEmail: app.email,
          primaryColor: colors.PRIMARY,
          buttonForgotPasswordLink
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
    command: SendForgotPasswordEmailCommand
  ): SendForgotPasswordEmailCommand {
    return cleanObject({
      toAccount: cleanValue(command?.toAccount),
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
