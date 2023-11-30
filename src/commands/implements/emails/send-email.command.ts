import { ICommand } from '@nestjs/cqrs';

import { EmailData, SendEmailDTO } from '@/dtos/emails/send-email.dto';

export class SendEmailCommand implements ICommand, SendEmailDTO {
  to: EmailData;
  route: string;
  data?: any;
  app: string;
  createdBy: string;

  constructor(data: SendEmailDTO) {
    this.route = data.route;
    this.to = data.to;
    this.data = data.data;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
