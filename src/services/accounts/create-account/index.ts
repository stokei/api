import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateAccountCommand } from '@/commands/implements/accounts/create-account.command';
import { CreateAccountDTO } from '@/dtos/accounts/create-account.dto';
import { AccountModel } from '@/models/account.model';

@Injectable()
export class CreateAccountService
  implements IBaseService<CreateAccountDTO, Promise<AccountModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateAccountDTO): Promise<AccountModel> {
    return await this.commandBus.execute(new CreateAccountCommand(data));
  }
}
