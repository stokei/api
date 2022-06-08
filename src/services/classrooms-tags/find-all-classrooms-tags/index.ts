import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { ClassroomsTagModel } from '@/models/classrooms-tag.model';
import { FindAllClassroomsTagsDTO } from '@/dtos/classrooms-tags/find-all-classrooms-tags.dto';
import { FindAllClassroomsTagsQuery } from '@/queries/implements/classrooms-tags/find-all-classrooms-tags.query';

@Injectable()
export class FindAllClassroomsTagsService
  implements
    IBaseService<
      FindAllClassroomsTagsDTO,
      Promise<IPaginatedType<ClassroomsTagModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllClassroomsTagsDTO
  ): Promise<IPaginatedType<ClassroomsTagModel>> {
    return await this.queryBus.execute(new FindAllClassroomsTagsQuery(data));
  }
}
