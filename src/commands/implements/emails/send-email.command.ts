import { ICommand } from '@nestjs/cqrs';

import { EmailData, SendEmailDTO } from '@/dtos/emails/send-email.dto';

export class SendEmailCommand implements ICommand, SendEmailDTO {
  from: EmailData;
  to: EmailData;
  subject: string;
  templateId: string;
  data?: any;
  app: string;
  createdBy: string;

  constructor(data: SendEmailDTO) {
    this.from = data.from;
    this.to = data.to;
    this.subject = data.subject;
    this.data = data.data;
    this.templateId = data.templateId;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
