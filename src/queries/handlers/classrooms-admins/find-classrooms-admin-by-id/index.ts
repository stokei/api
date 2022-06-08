import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  ClassroomsAdminNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ClassroomsAdminModel } from '@/models/classrooms-admin.model';
import { FindClassroomsAdminByIdRepository } from '@/repositories/classrooms-admins/find-classrooms-admin-by-id';
import { FindClassroomsAdminByIdQuery } from '@/queries/implements/classrooms-admins/find-classrooms-admin-by-id.query';

@QueryHandler(FindClassroomsAdminByIdQuery)
export class FindClassroomsAdminByIdQueryHandler
  implements IQueryHandler<FindClassroomsAdminByIdQuery>
{
  constructor(
    private readonly findClassroomsAdminByIdRepository: FindClassroomsAdminByIdRepository
  ) {}

  async execute(
    query: FindClassroomsAdminByIdQuery
  ): Promise<ClassroomsAdminModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const classroomsAdmin =
      await this.findClassroomsAdminByIdRepository.execute(id);
    if (!classroomsAdmin) {
      throw new ClassroomsAdminNotFoundException();
    }
    return classroomsAdmin;
  }
}
