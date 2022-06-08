import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { ClassroomModel } from '@/models/classroom.model';
import { FindAllClassroomsDTO } from '@/dtos/classrooms/find-all-classrooms.dto';
import { FindAllClassroomsQuery } from '@/queries/implements/classrooms/find-all-classrooms.query';

@Injectable()
export class FindAllClassroomsService
  implements
    IBaseService<FindAllClassroomsDTO, Promise<IPaginatedType<ClassroomModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllClassroomsDTO
  ): Promise<IPaginatedType<ClassroomModel>> {
    return await this.queryBus.execute(new FindAllClassroomsQuery(data));
  }
}
