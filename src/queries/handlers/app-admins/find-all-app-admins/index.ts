import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { AppAdminMapper } from '@/mappers/app-admins';
import { AppAdminModel } from '@/models/app-admin.model';
import { FindAllAppAdminsQuery } from '@/queries/implements/app-admins/find-all-app-admins.query';
import { CountAppAdminsRepository } from '@/repositories/app-admins/count-app-admins';
import { FindAllAppAdminsRepository } from '@/repositories/app-admins/find-all-app-admins';

@QueryHandler(FindAllAppAdminsQuery)
export class FindAllAppAdminsQueryHandler
  implements IQueryHandler<FindAllAppAdminsQuery>
{
  constructor(
    private readonly findAllAppAdminRepository: FindAllAppAdminsRepository,
    private readonly countAppAdminsRepository: CountAppAdminsRepository
  ) {}

  async execute(
    query: FindAllAppAdminsQuery
  ): Promise<IPaginatedType<AppAdminModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new AppAdminMapper().toFindAllQueryClean(query);
    const appAdmins = await this.findAllAppAdminRepository.execute(data);
    const totalCount = await this.countAppAdminsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<AppAdminModel>().toPaginationList({
      items: appAdmins,
      page: data.page,
      totalCount
    });
  }
}
