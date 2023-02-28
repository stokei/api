import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { AddAccountRoleCommand } from '@/commands/implements/accounts/add-account-role.command';
import { AddAccountRoleDTO } from '@/dtos/accounts/add-account-role.dto';
import { AccountModel } from '@/models/account.model';

@Injectable()
export class AddAccountRoleService
  implements IBaseService<AddAccountRoleDTO, Promise<AccountModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: AddAccountRoleDTO): Promise<AccountModel> {
    return await this.commandBus.execute(new AddAccountRoleCommand(data));
  }
}
