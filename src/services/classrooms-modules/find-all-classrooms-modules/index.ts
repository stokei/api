import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllClassroomsModulesDTO } from '@/dtos/classrooms-modules/find-all-classrooms-modules.dto';
import { ClassroomsModuleModel } from '@/models/classrooms-module.model';
import { FindAllClassroomsModulesQuery } from '@/queries/implements/classrooms-modules/find-all-classrooms-modules.query';

@Injectable()
export class FindAllClassroomsModulesService
  implements
    IBaseService<
      FindAllClassroomsModulesDTO,
      Promise<IPaginatedType<ClassroomsModuleModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllClassroomsModulesDTO
  ): Promise<IPaginatedType<ClassroomsModuleModel>> {
    return await this.queryBus.execute(new FindAllClassroomsModulesQuery(data));
  }
}
