import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RoleModel } from '@/models/role.model';
import { FindRoleByIdQuery } from '@/queries/implements/roles/find-role-by-id.query';

@Injectable()
export class FindRoleByIdService
  implements IBaseService<string, Promise<RoleModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<RoleModel> {
    return await this.queryBus.execute(new FindRoleByIdQuery(data));
  }
}
