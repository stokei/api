import { Injectable } from '@nestjs/common';
import { MailDataRequired, MailService } from '@sendgrid/mail';
import { IBaseService } from '@stokei/nestjs';

import { SENDGRID_KEY } from '@/environments';

@Injectable()
export class SendEmailSendgridService
  implements IBaseService<MailDataRequired, Promise<boolean>>
{
  private sendgrid: MailService;
  constructor() {
    this.sendgrid = new MailService();
    this.sendgrid.setApiKey(SENDGRID_KEY);
  }
  async execute(data: MailDataRequired): Promise<boolean> {
    await this.sendgrid.send(data);
    return true;
  }
}
