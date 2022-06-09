import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ClassroomsModuleModel } from '@/models/classrooms-module.model';
import { FindClassroomsModuleByIdQuery } from '@/queries/implements/classrooms-modules/find-classrooms-module-by-id.query';

@Injectable()
export class FindClassroomsModuleByIdService
  implements IBaseService<string, Promise<ClassroomsModuleModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ClassroomsModuleModel> {
    return await this.queryBus.execute(new FindClassroomsModuleByIdQuery(data));
  }
}
