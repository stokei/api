import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ClassroomModel } from '@/models/classroom.model';
import { FindClassroomByIdQuery } from '@/queries/implements/classrooms/find-classroom-by-id.query';

@Injectable()
export class FindClassroomByIdService
  implements IBaseService<string, Promise<ClassroomModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ClassroomModel> {
    return await this.queryBus.execute(new FindClassroomByIdQuery(data));
  }
}
