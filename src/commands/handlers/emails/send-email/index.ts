import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { axiosClient } from '@/clients/axios';
import { SendEmailCommand } from '@/commands/implements/emails/send-email.command';
import { EmailData } from '@/dtos/emails/send-email.dto';
import { EMAILS_API_BASE_URL } from '@/environments';
import { DataNotFoundException, ParamNotFoundException } from '@/errors';
import { FindAppEmailInformationsService } from '@/services/apps/find-app-email-informations';
import { appendPathnameToURL } from '@/utils/append-pathname-to-url';

type SendEmailCommandKeys = keyof SendEmailCommand;

@CommandHandler(SendEmailCommand)
export class SendEmailCommandHandler
  implements ICommandHandler<SendEmailCommand>
{
  private readonly logger = new Logger(SendEmailCommandHandler.name);
  constructor(
    private readonly findAppEmailInformationsService: FindAppEmailInformationsService
  ) {}

  async execute(command: SendEmailCommand) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.route) {
        throw new ParamNotFoundException<SendEmailCommandKeys>('route');
      }
      if (!data?.to) {
        throw new ParamNotFoundException<SendEmailCommandKeys>('to');
      }

      const { app, baseAppURL, colors, logoURL } =
        await this.findAppEmailInformationsService.execute({
          app: data.app
        });

      const emailData = {
        ...data?.data,
        to: data.to,
        app: {
          id: app?.id,
          name: app?.name,
          email: app?.email,
          url: baseAppURL,
          logoURL: logoURL,
          colors: {
            primary: colors?.PRIMARY
          }
        }
      };

      const response = await axiosClient.post(
        appendPathnameToURL(EMAILS_API_BASE_URL, data?.route),
        emailData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response?.data;
    } catch (error) {
      const to = typeof data?.to !== 'string' ? data?.to?.email : data?.to;
      this.logger.error(`From(#${data?.app} -> ${to}): ${error?.message}`);
      return;
    }
  }

  private clearData(command: SendEmailCommand): SendEmailCommand {
    const cleanEmail = (email: EmailData) => {
      if (typeof email === 'string') {
        return cleanValue(email);
      }
      return cleanObject({
        email: email.email,
        name: email.name
      });
    };
    return cleanObject({
      route: cleanValue(command?.route),
      to: cleanEmail(command?.to),
      data: command?.data,
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
