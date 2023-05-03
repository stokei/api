import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { SendEmailCommand } from '@/commands/implements/emails/send-email.command';
import { SendEmailDTO } from '@/dtos/emails/send-email.dto';

@Injectable()
export class SendEmailService
  implements IBaseService<SendEmailDTO, Promise<boolean>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: SendEmailDTO): Promise<boolean> {
    return await this.commandBus.execute(new SendEmailCommand(data));
  }
}
