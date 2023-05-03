import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { SendEmailCommand } from '@/commands/implements/emails/send-email.command';
import { defaultEmails } from '@/constants/default-emails';
import { EmailData } from '@/dtos/emails/send-email.dto';
import { DataNotFoundException, ParamNotFoundException } from '@/errors';
import { SendEmailSendgridService } from '@/services/sendgrid/send-email-sendgrid';

type SendEmailCommandKeys = keyof SendEmailCommand;

@CommandHandler(SendEmailCommand)
export class SendEmailCommandHandler
  implements ICommandHandler<SendEmailCommand>
{
  private readonly logger = new Logger(SendEmailCommandHandler.name);
  constructor(
    private readonly sendEmailSendgridService: SendEmailSendgridService
  ) {}

  async execute(command: SendEmailCommand) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.from) {
        throw new ParamNotFoundException<SendEmailCommandKeys>('from');
      }
      if (!data?.to) {
        throw new ParamNotFoundException<SendEmailCommandKeys>('to');
      }
      if (!data?.templateId) {
        throw new ParamNotFoundException<SendEmailCommandKeys>('templateId');
      }

      return await this.sendEmailSendgridService.execute({
        replyTo: data.from,
        from: {
          name: typeof data.from !== 'string' ? data.from?.name : undefined,
          email: defaultEmails.contact
        },
        to: data.to,
        subject: data.subject,
        templateId: data.templateId,
        dynamicTemplateData: data.data
      });
    } catch (error) {
      this.logger.error(
        `From(#${data?.from} - ${data?.to}): ${error?.message}`
      );
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
      from: cleanEmail(command?.from),
      to: cleanEmail(command?.to),
      subject: cleanValue(command?.subject),
      templateId: cleanValue(command?.templateId),
      data: command?.data,
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
