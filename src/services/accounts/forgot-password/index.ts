import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ForgotPasswordCommand } from '@/commands/implements/accounts/forgot-password.command';
import { ForgotPasswordDTO } from '@/dtos/accounts/forgot-password.dto';
@Injectable()
export class ForgotPasswordService
  implements IBaseService<ForgotPasswordDTO, Promise<boolean>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: ForgotPasswordDTO): Promise<boolean> {
    return await this.commandBus.execute(new ForgotPasswordCommand(data));
  }
}
