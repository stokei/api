import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllAppAdminsDTO } from '@/dtos/app-admins/find-all-app-admins.dto';
import { AppAdminModel } from '@/models/app-admin.model';
import { FindAllAppAdminsQuery } from '@/queries/implements/app-admins/find-all-app-admins.query';

@Injectable()
export class FindAllAppAdminsService
  implements
    IBaseService<FindAllAppAdminsDTO, Promise<IPaginatedType<AppAdminModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllAppAdminsDTO
  ): Promise<IPaginatedType<AppAdminModel>> {
    return await this.queryBus.execute(new FindAllAppAdminsQuery(data));
  }
}
