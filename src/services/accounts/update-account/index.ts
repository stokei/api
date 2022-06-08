import { UpdateAccountCommand } from '@/commands/implements/accounts/update-account.command';
import { UpdateAccountDTO } from '@/dtos/accounts/update-account.dto';
import { AccountModel } from '@/models/account.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdateAccountService
  implements IBaseService<UpdateAccountDTO, Promise<AccountModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateAccountDTO): Promise<AccountModel> {
    return await this.commandBus.execute(new UpdateAccountCommand(data));
  }
}
