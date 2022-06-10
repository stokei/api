import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { LoginCommand } from '@/commands/implements/accounts/login.command';
import { LoginDTO } from '@/dtos/accounts/login.dto';
import { AccountModel } from '@/models/account.model';

@Injectable()
export class LoginService
  implements IBaseService<LoginDTO, Promise<AccountModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: LoginDTO): Promise<AccountModel> {
    return await this.commandBus.execute(new LoginCommand(data));
  }
}
