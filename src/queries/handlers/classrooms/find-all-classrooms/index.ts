import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { ClassroomMapper } from '@/mappers/classrooms';
import { ClassroomModel } from '@/models/classroom.model';
import { FindAllClassroomsQuery } from '@/queries/implements/classrooms/find-all-classrooms.query';
import { CountClassroomsRepository } from '@/repositories/classrooms/count-classrooms';
import { FindAllClassroomsRepository } from '@/repositories/classrooms/find-all-classrooms';

@QueryHandler(FindAllClassroomsQuery)
export class FindAllClassroomsQueryHandler
  implements IQueryHandler<FindAllClassroomsQuery>
{
  constructor(
    private readonly findAllClassroomRepository: FindAllClassroomsRepository,
    private readonly countClassroomsRepository: CountClassroomsRepository
  ) {}

  async execute(
    query: FindAllClassroomsQuery
  ): Promise<IPaginatedType<ClassroomModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new ClassroomMapper().toFindAllQueryClean(query);
    const classrooms = await this.findAllClassroomRepository.execute(data);
    const totalCount = await this.countClassroomsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ClassroomModel>().toPaginationList({
      items: classrooms,
      page: data.page,
      totalCount
    });
  }
}
