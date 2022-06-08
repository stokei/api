import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { CoursesInstructorModel } from '@/models/courses-instructor.model';
import { FindCoursesInstructorByIdQuery } from '@/queries/implements/courses-instructors/find-courses-instructor-by-id.query';

@Injectable()
export class FindCoursesInstructorByIdService
  implements IBaseService<string, Promise<CoursesInstructorModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<CoursesInstructorModel> {
    return await this.queryBus.execute(
      new FindCoursesInstructorByIdQuery(data)
    );
  }
}
