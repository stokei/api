import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveRoleCommand } from '@/commands/implements/roles/remove-role.command';
import { RemoveRoleDTO } from '@/dtos/roles/remove-role.dto';
import { RoleModel } from '@/models/role.model';

@Injectable()
export class RemoveRoleService
  implements IBaseService<RemoveRoleDTO, Promise<RoleModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveRoleDTO): Promise<RoleModel> {
    return await this.commandBus.execute(new RemoveRoleCommand(data));
  }
}
