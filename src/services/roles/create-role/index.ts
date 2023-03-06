import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateRoleCommand } from '@/commands/implements/roles/create-role.command';
import { CreateRoleDTO } from '@/dtos/roles/create-role.dto';
import { RoleModel } from '@/models/role.model';

@Injectable()
export class CreateRoleService
  implements IBaseService<CreateRoleDTO, Promise<RoleModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateRoleDTO): Promise<RoleModel> {
    return await this.commandBus.execute(new CreateRoleCommand(data));
  }
}
