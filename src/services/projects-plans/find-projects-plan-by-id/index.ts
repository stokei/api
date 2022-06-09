import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ProjectsPlanModel } from '@/models/projects-plan.model';
import { FindProjectsPlanByIdQuery } from '@/queries/implements/projects-plans/find-projects-plan-by-id.query';

@Injectable()
export class FindProjectsPlanByIdService
  implements IBaseService<string, Promise<ProjectsPlanModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ProjectsPlanModel> {
    return await this.queryBus.execute(new FindProjectsPlanByIdQuery(data));
  }
}
