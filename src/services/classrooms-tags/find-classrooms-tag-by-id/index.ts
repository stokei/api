import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { ClassroomsTagModel } from '@/models/classrooms-tag.model';
import { FindClassroomsTagByIdQuery } from '@/queries/implements/classrooms-tags/find-classrooms-tag-by-id.query';

@Injectable()
export class FindClassroomsTagByIdService
  implements IBaseService<string, Promise<ClassroomsTagModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ClassroomsTagModel> {
    return await this.queryBus.execute(new FindClassroomsTagByIdQuery(data));
  }
}
