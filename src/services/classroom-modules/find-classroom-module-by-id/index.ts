import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ClassroomModuleModel } from '@/models/classroom-module.model';
import { FindClassroomModuleByIdQuery } from '@/queries/implements/classroom-modules/find-classroom-module-by-id.query';

@Injectable()
export class FindClassroomModuleByIdService
  implements IBaseService<string, Promise<ClassroomModuleModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ClassroomModuleModel> {
    return await this.queryBus.execute(new FindClassroomModuleByIdQuery(data));
  }
}
