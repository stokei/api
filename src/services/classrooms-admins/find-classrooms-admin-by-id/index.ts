import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ClassroomsAdminModel } from '@/models/classrooms-admin.model';
import { FindClassroomsAdminByIdQuery } from '@/queries/implements/classrooms-admins/find-classrooms-admin-by-id.query';

@Injectable()
export class FindClassroomsAdminByIdService
  implements IBaseService<string, Promise<ClassroomsAdminModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ClassroomsAdminModel> {
    return await this.queryBus.execute(new FindClassroomsAdminByIdQuery(data));
  }
}
