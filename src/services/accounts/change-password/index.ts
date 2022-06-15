import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ChangePasswordCommand } from '@/commands/implements/accounts/change-password.command';
import { ChangePasswordDTO } from '@/dtos/accounts/change-password.dto';
import { AccountModel } from '@/models/account.model';

@Injectable()
export class ChangePasswordService
  implements IBaseService<ChangePasswordDTO, Promise<AccountModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: ChangePasswordDTO): Promise<AccountModel> {
    return await this.commandBus.execute(new ChangePasswordCommand(data));
  }
}
