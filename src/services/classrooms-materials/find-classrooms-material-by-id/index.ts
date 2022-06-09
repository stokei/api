import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ClassroomsMaterialModel } from '@/models/classrooms-material.model';
import { FindClassroomsMaterialByIdQuery } from '@/queries/implements/classrooms-materials/find-classrooms-material-by-id.query';

@Injectable()
export class FindClassroomsMaterialByIdService
  implements IBaseService<string, Promise<ClassroomsMaterialModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ClassroomsMaterialModel> {
    return await this.queryBus.execute(
      new FindClassroomsMaterialByIdQuery(data)
    );
  }
}
