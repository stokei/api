import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { SendUpdateOwnPasswordEmailCommand } from '@/commands/implements/emails/send-update-own-password-email.command';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAppEmailInformationsService } from '@/services/apps/find-app-email-informations';
import { SendEmailService } from '@/services/emails/send-email';
import { appendPathnameToURL } from '@/utils/append-pathname-to-url';

type SendUpdateOwnPasswordEmailCommandKeys =
  keyof SendUpdateOwnPasswordEmailCommand;

@CommandHandler(SendUpdateOwnPasswordEmailCommand)
export class SendUpdateOwnPasswordEmailCommandHandler
  implements ICommandHandler<SendUpdateOwnPasswordEmailCommand>
{
  private readonly logger = new Logger(
    SendUpdateOwnPasswordEmailCommandHandler.name
  );
  constructor(
    private readonly sendEmailService: SendEmailService,
    private readonly findAppEmailInformationsService: FindAppEmailInformationsService,
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  async execute(command: SendUpdateOwnPasswordEmailCommand) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.app) {
        throw new ParamNotFoundException<SendUpdateOwnPasswordEmailCommandKeys>(
          'app'
        );
      }
      if (!data?.toAccount) {
        throw new ParamNotFoundException<SendUpdateOwnPasswordEmailCommandKeys>(
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

      const buttonUpdateOwnPasswordLink = appendPathnameToURL(
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
        subject: 'Alteração de senha',
        templateId: 'd-76f499075858455780e7d90c35798f0c',
        createdBy: data.createdBy,
        data: {
          logoURL,
          appName: app.name,
          appEmail: app.email,
          primaryColor: colors.PRIMARY,
          buttonUpdateOwnPasswordLink
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
    command: SendUpdateOwnPasswordEmailCommand
  ): SendUpdateOwnPasswordEmailCommand {
    return cleanObject({
      toAccount: cleanValue(command?.toAccount),
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}