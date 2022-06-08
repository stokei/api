import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { ProjectsPlanModel } from '@/models/projects-plan.model';
import { FindAllProjectsPlansDTO } from '@/dtos/projects-plans/find-all-projects-plans.dto';
import { FindAllProjectsPlansQuery } from '@/queries/implements/projects-plans/find-all-projects-plans.query';

@Injectable()
export class FindAllProjectsPlansService
  implements
    IBaseService<
      FindAllProjectsPlansDTO,
      Promise<IPaginatedType<ProjectsPlanModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllProjectsPlansDTO
  ): Promise<IPaginatedType<ProjectsPlanModel>> {
    return await this.queryBus.execute(new FindAllProjectsPlansQuery(data));
  }
}
