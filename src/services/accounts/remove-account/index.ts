import { RemoveAccountCommand } from '@/commands/implements/accounts/remove-account.command';
import { RemoveAccountDTO } from '@/dtos/accounts/remove-account.dto';
import { AccountModel } from '@/models/account.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveAccountService
  implements IBaseService<RemoveAccountDTO, Promise<AccountModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveAccountDTO): Promise<AccountModel> {
    return await this.commandBus.execute(new RemoveAccountCommand(data));
  }
}
