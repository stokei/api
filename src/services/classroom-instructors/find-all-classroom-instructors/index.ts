import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllClassroomInstructorsDTO } from '@/dtos/classroom-instructors/find-all-classroom-instructors.dto';
import { ClassroomInstructorModel } from '@/models/classroom-instructor.model';
import { FindAllClassroomInstructorsQuery } from '@/queries/implements/classroom-instructors/find-all-classroom-instructors.query';

@Injectable()
export class FindAllClassroomInstructorsService
  implements
    IBaseService<
      FindAllClassroomInstructorsDTO,
      Promise<IPaginatedType<ClassroomInstructorModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllClassroomInstructorsDTO
  ): Promise<IPaginatedType<ClassroomInstructorModel>> {
    return await this.queryBus.execute(
      new FindAllClassroomInstructorsQuery(data)
    );
  }
}
