import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  AppAdminNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { AppAdminModel } from '@/models/app-admin.model';
import { FindAppAdminByIdQuery } from '@/queries/implements/app-admins/find-app-admin-by-id.query';
import { FindAppAdminByIdRepository } from '@/repositories/app-admins/find-app-admin-by-id';

@QueryHandler(FindAppAdminByIdQuery)
export class FindAppAdminByIdQueryHandler
  implements IQueryHandler<FindAppAdminByIdQuery>
{
  constructor(
    private readonly findAppAdminByIdRepository: FindAppAdminByIdRepository
  ) {}

  async execute(query: FindAppAdminByIdQuery): Promise<AppAdminModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const appAdmin = await this.findAppAdminByIdRepository.execute(id);
    if (!appAdmin) {
      throw new AppAdminNotFoundException();
    }
    return appAdmin;
  }
}
