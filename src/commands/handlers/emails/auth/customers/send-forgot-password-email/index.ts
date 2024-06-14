import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { SendAuthCustomersForgotPasswordEmailCommand } from '@/commands/implements/emails/auth/customers/send-forgot-password-email.command';
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

type SendAuthCustomersForgotPasswordEmailCommandKeys =
  keyof SendAuthCustomersForgotPasswordEmailCommand;

@CommandHandler(SendAuthCustomersForgotPasswordEmailCommand)
export class SendAuthCustomersForgotPasswordEmailCommandHandler
  implements ICommandHandler<SendAuthCustomersForgotPasswordEmailCommand>
{
  private readonly logger = new Logger(
    SendAuthCustomersForgotPasswordEmailCommandHandler.name
  );
  constructor(
    private readonly sendEmailService: SendEmailService,
    private readonly findAppEmailInformationsService: FindAppEmailInformationsService,
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

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

      const buttonForgotPasswordLink = appendPathnameToURL(
        baseAppURL,
        `${frontendRoutes.appRoutes.auth.changePassword}?code=${toAccount.forgotPasswordCode}`
      );
      return await this.sendEmailService.execute({
        route: '/auth/customers/forgot-password',
        to: toAccount.email,
        app: data.app,
        createdBy: data.createdBy,
        data: {
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
    command: SendAuthCustomersForgotPasswordEmailCommand
  ): SendAuthCustomersForgotPasswordEmailCommand {
    return cleanObject({
      toAccount: cleanValue(command?.toAccount),
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
