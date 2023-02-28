import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveAccountRoleCommand } from '@/commands/implements/accounts/remove-account-role.command';
import { RemoveAccountRoleDTO } from '@/dtos/accounts/remove-account-role.dto';
import { AccountModel } from '@/models/account.model';

@Injectable()
export class RemoveAccountRoleService
  implements IBaseService<RemoveAccountRoleDTO, Promise<AccountModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveAccountRoleDTO): Promise<AccountModel> {
    return await this.commandBus.execute(new RemoveAccountRoleCommand(data));
  }
}
