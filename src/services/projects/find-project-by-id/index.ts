import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ProjectModel } from '@/models/project.model';
import { FindProjectByIdQuery } from '@/queries/implements/projects/find-project-by-id.query';

@Injectable()
export class FindProjectByIdService
  implements IBaseService<string, Promise<ProjectModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ProjectModel> {
    return await this.queryBus.execute(new FindProjectByIdQuery(data));
  }
}
