import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllClassroomsMaterialsDTO } from '@/dtos/classrooms-materials/find-all-classrooms-materials.dto';
import { ClassroomsMaterialModel } from '@/models/classrooms-material.model';
import { FindAllClassroomsMaterialsQuery } from '@/queries/implements/classrooms-materials/find-all-classrooms-materials.query';

@Injectable()
export class FindAllClassroomsMaterialsService
  implements
    IBaseService<
      FindAllClassroomsMaterialsDTO,
      Promise<IPaginatedType<ClassroomsMaterialModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllClassroomsMaterialsDTO
  ): Promise<IPaginatedType<ClassroomsMaterialModel>> {
    return await this.queryBus.execute(
      new FindAllClassroomsMaterialsQuery(data)
    );
  }
}
