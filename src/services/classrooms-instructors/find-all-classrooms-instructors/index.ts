import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllClassroomsInstructorsDTO } from '@/dtos/classrooms-instructors/find-all-classrooms-instructors.dto';
import { ClassroomsInstructorModel } from '@/models/classrooms-instructor.model';
import { FindAllClassroomsInstructorsQuery } from '@/queries/implements/classrooms-instructors/find-all-classrooms-instructors.query';

@Injectable()
export class FindAllClassroomsInstructorsService
  implements
    IBaseService<
      FindAllClassroomsInstructorsDTO,
      Promise<IPaginatedType<ClassroomsInstructorModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllClassroomsInstructorsDTO
  ): Promise<IPaginatedType<ClassroomsInstructorModel>> {
    return await this.queryBus.execute(
      new FindAllClassroomsInstructorsQuery(data)
    );
  }
}
