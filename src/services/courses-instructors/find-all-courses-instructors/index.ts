import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { CoursesInstructorModel } from '@/models/courses-instructor.model';
import { FindAllCoursesInstructorsDTO } from '@/dtos/courses-instructors/find-all-courses-instructors.dto';
import { FindAllCoursesInstructorsQuery } from '@/queries/implements/courses-instructors/find-all-courses-instructors.query';

@Injectable()
export class FindAllCoursesInstructorsService
  implements
    IBaseService<
      FindAllCoursesInstructorsDTO,
      Promise<IPaginatedType<CoursesInstructorModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllCoursesInstructorsDTO
  ): Promise<IPaginatedType<CoursesInstructorModel>> {
    return await this.queryBus.execute(
      new FindAllCoursesInstructorsQuery(data)
    );
  }
}
