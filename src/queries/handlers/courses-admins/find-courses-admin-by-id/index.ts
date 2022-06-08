import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  CoursesAdminNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CoursesAdminModel } from '@/models/courses-admin.model';
import { FindCoursesAdminByIdRepository } from '@/repositories/courses-admins/find-courses-admin-by-id';
import { FindCoursesAdminByIdQuery } from '@/queries/implements/courses-admins/find-courses-admin-by-id.query';

@QueryHandler(FindCoursesAdminByIdQuery)
export class FindCoursesAdminByIdQueryHandler
  implements IQueryHandler<FindCoursesAdminByIdQuery>
{
  constructor(
    private readonly findCoursesAdminByIdRepository: FindCoursesAdminByIdRepository
  ) {}

  async execute(query: FindCoursesAdminByIdQuery): Promise<CoursesAdminModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const coursesAdmin = await this.findCoursesAdminByIdRepository.execute(id);
    if (!coursesAdmin) {
      throw new CoursesAdminNotFoundException();
    }
    return coursesAdmin;
  }
}
