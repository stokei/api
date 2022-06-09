import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllCoursesDTO } from '@/dtos/courses/find-all-courses.dto';
import { CourseModel } from '@/models/course.model';
import { FindAllCoursesQuery } from '@/queries/implements/courses/find-all-courses.query';

@Injectable()
export class FindAllCoursesService
  implements
    IBaseService<FindAllCoursesDTO, Promise<IPaginatedType<CourseModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAllCoursesDTO): Promise<IPaginatedType<CourseModel>> {
    return await this.queryBus.execute(new FindAllCoursesQuery(data));
  }
}
