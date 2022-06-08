import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { CourseModel } from '@/models/course.model';
import { FindCourseByIdQuery } from '@/queries/implements/courses/find-course-by-id.query';

@Injectable()
export class FindCourseByIdService
  implements IBaseService<string, Promise<CourseModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<CourseModel> {
    return await this.queryBus.execute(new FindCourseByIdQuery(data));
  }
}
