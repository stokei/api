import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { AppAdminModel } from '@/models/app-admin.model';
import { FindAppAdminByIdQuery } from '@/queries/implements/app-admins/find-app-admin-by-id.query';

@Injectable()
export class FindAppAdminByIdService
  implements IBaseService<string, Promise<AppAdminModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<AppAdminModel> {
    return await this.queryBus.execute(new FindAppAdminByIdQuery(data));
  }
}
