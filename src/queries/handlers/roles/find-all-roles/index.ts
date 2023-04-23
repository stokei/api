import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { RoleMapper } from '@/mappers/roles';
import { RoleModel } from '@/models/role.model';
import { FindAllRolesQuery } from '@/queries/implements/roles/find-all-roles.query';
import { CountRolesRepository } from '@/repositories/roles/count-roles';
import { FindAllRolesRepository } from '@/repositories/roles/find-all-roles';

@QueryHandler(FindAllRolesQuery)
export class FindAllRolesQueryHandler
  implements IQueryHandler<FindAllRolesQuery>
{
  constructor(
    private readonly findAllRoleRepository: FindAllRolesRepository,
    private readonly countRolesRepository: CountRolesRepository
  ) {}

  async execute(query: FindAllRolesQuery): Promise<IPaginatedType<RoleModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new RoleMapper().toFindAllQueryClean(query);
    const courseInstructors = await this.findAllRoleRepository.execute(data);
    const totalCount = await this.countRolesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<RoleModel>().toPaginationList({
      items: courseInstructors,
      page: data.page,
      totalCount
    });
  }
}
