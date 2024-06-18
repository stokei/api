import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { SendAuthSellersNewMemberEmailCommand } from '@/commands/implements/emails/auth/sellers/send-new-member-email.command';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { SendEmailService } from '@/services/emails/send-email';

type SendAuthSellersNewMemberEmailCommandKeys =
  keyof SendAuthSellersNewMemberEmailCommand;

@CommandHandler(SendAuthSellersNewMemberEmailCommand)
export class SendAuthSellersNewMemberEmailCommandHandler
  implements ICommandHandler<SendAuthSellersNewMemberEmailCommand>
{
  private readonly logger = new Logger(
    SendAuthSellersNewMemberEmailCommandHandler.name
  );
  constructor(
    private readonly sendEmailService: SendEmailService,
    private readonly findAppByIdService: FindAppByIdService
  ) {}

  async execute(command: SendAuthSellersNewMemberEmailCommand) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.app) {
        throw new ParamNotFoundException<SendAuthSellersNewMemberEmailCommandKeys>(
          'app'
        );
      }
      if (!data?.account) {
        throw new ParamNotFoundException<SendAuthSellersNewMemberEmailCommandKeys>(
          'account'
        );
      }
      const app = await this.findAppByIdService.execute(data.app);
      if (!app) {
        throw new AppNotFoundException();
      }

      return await this.sendEmailService.execute({
        route: '/auth/sellers/new-member',
        to: app.email,
        app: app.id,
        createdBy: data.createdBy,
        data: {
          member: data?.account
        }
      });
    } catch (error) {
      this.logger.error(
        `From ${data?.app} to ${data?.account?.id}: ${error?.message}`
      );
      return;
    }
  }

  private clearData(
    command: SendAuthSellersNewMemberEmailCommand
  ): SendAuthSellersNewMemberEmailCommand {
    return cleanObject({
      account: command?.account,
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
