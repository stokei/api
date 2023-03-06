import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllRolesDTO } from '@/dtos/roles/find-all-roles.dto';
import { RoleModel } from '@/models/role.model';
import { FindAllRolesQuery } from '@/queries/implements/roles/find-all-roles.query';

@Injectable()
export class FindAllRolesService
  implements IBaseService<FindAllRolesDTO, Promise<IPaginatedType<RoleModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAllRolesDTO): Promise<IPaginatedType<RoleModel>> {
    return await this.queryBus.execute(new FindAllRolesQuery(data));
  }
}
