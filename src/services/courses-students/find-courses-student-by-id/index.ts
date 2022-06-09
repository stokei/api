import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CoursesStudentModel } from '@/models/courses-student.model';
import { FindCoursesStudentByIdQuery } from '@/queries/implements/courses-students/find-courses-student-by-id.query';

@Injectable()
export class FindCoursesStudentByIdService
  implements IBaseService<string, Promise<CoursesStudentModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<CoursesStudentModel> {
    return await this.queryBus.execute(new FindCoursesStudentByIdQuery(data));
  }
}
