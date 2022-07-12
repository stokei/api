import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllClassroomModulesDTO } from '@/dtos/classroom-modules/find-all-classroom-modules.dto';
import { ClassroomModuleModel } from '@/models/classroom-module.model';
import { FindAllClassroomModulesQuery } from '@/queries/implements/classroom-modules/find-all-classroom-modules.query';

@Injectable()
export class FindAllClassroomModulesService
  implements
    IBaseService<
      FindAllClassroomModulesDTO,
      Promise<IPaginatedType<ClassroomModuleModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllClassroomModulesDTO
  ): Promise<IPaginatedType<ClassroomModuleModel>> {
    return await this.queryBus.execute(new FindAllClassroomModulesQuery(data));
  }
}
