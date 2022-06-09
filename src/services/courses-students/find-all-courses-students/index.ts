import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllCoursesStudentsDTO } from '@/dtos/courses-students/find-all-courses-students.dto';
import { CoursesStudentModel } from '@/models/courses-student.model';
import { FindAllCoursesStudentsQuery } from '@/queries/implements/courses-students/find-all-courses-students.query';

@Injectable()
export class FindAllCoursesStudentsService
  implements
    IBaseService<
      FindAllCoursesStudentsDTO,
      Promise<IPaginatedType<CoursesStudentModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllCoursesStudentsDTO
  ): Promise<IPaginatedType<CoursesStudentModel>> {
    return await this.queryBus.execute(new FindAllCoursesStudentsQuery(data));
  }
}
