import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { SendAuthCustomersUpdateOwnPasswordEmailCommand } from '@/commands/implements/emails/auth/customers/send-update-own-password-email.command';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { frontendRoutes } from '@/frontend-routes';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAppEmailInformationsService } from '@/services/apps/find-app-email-informations';
import { SendEmailService } from '@/services/emails/send-email';
import { appendPathnameToURL } from '@/utils/append-pathname-to-url';

type SendAuthCustomersUpdateOwnPasswordEmailCommandKeys =
  keyof SendAuthCustomersUpdateOwnPasswordEmailCommand;

@CommandHandler(SendAuthCustomersUpdateOwnPasswordEmailCommand)
export class SendAuthCustomersUpdateOwnPasswordEmailCommandHandler
  implements ICommandHandler<SendAuthCustomersUpdateOwnPasswordEmailCommand>
{
  private readonly logger = new Logger(
    SendAuthCustomersUpdateOwnPasswordEmailCommandHandler.name
  );
  constructor(
    private readonly sendEmailService: SendEmailService,
    private readonly findAppEmailInformationsService: FindAppEmailInformationsService,
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

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

      const toAccount = await this.findAccountByIdService.execute(
        data.toAccount
      );
      if (!toAccount) {
        throw new AppNotFoundException();
      }
      const { baseAppURL } = await this.findAppEmailInformationsService.execute(
        {
          app: data.app
        }
      );

      const buttonUpdateOwnPasswordLink = appendPathnameToURL(
        baseAppURL,
        `${frontendRoutes.appRoutes.auth.changePassword}?code=${toAccount.forgotPasswordCode}`
      );
      return await this.sendEmailService.execute({
        route: '/auth/customers/update-own-password',
        to: toAccount.email,
        app: data.app,
        createdBy: data.createdBy,
        data: {
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
    command: SendAuthCustomersUpdateOwnPasswordEmailCommand
  ): SendAuthCustomersUpdateOwnPasswordEmailCommand {
    return cleanObject({
      toAccount: cleanValue(command?.toAccount),
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
