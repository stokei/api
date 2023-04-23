import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  RoleNotFoundException
} from '@/errors';
import { RoleModel } from '@/models/role.model';
import { FindRoleByIdQuery } from '@/queries/implements/roles/find-role-by-id.query';
import { FindRoleByIdRepository } from '@/repositories/roles/find-role-by-id';

@QueryHandler(FindRoleByIdQuery)
export class FindRoleByIdQueryHandler
  implements IQueryHandler<FindRoleByIdQuery>
{
  constructor(
    private readonly findRoleByIdRepository: FindRoleByIdRepository
  ) {}

  async execute(query: FindRoleByIdQuery): Promise<RoleModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const role = await this.findRoleByIdRepository.execute(id);
    if (!role) {
      throw new RoleNotFoundException();
    }
    return role;
  }
}
