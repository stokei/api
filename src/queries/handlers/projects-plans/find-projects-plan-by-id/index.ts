import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  ProjectsPlanNotFoundException
} from '@/errors';
import { ProjectsPlanModel } from '@/models/projects-plan.model';
import { FindProjectsPlanByIdQuery } from '@/queries/implements/projects-plans/find-projects-plan-by-id.query';
import { FindProjectsPlanByIdRepository } from '@/repositories/projects-plans/find-projects-plan-by-id';

@QueryHandler(FindProjectsPlanByIdQuery)
export class FindProjectsPlanByIdQueryHandler
  implements IQueryHandler<FindProjectsPlanByIdQuery>
{
  constructor(
    private readonly findProjectsPlanByIdRepository: FindProjectsPlanByIdRepository
  ) {}

  async execute(query: FindProjectsPlanByIdQuery): Promise<ProjectsPlanModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const projectsPlan = await this.findProjectsPlanByIdRepository.execute(id);
    if (!projectsPlan) {
      throw new ProjectsPlanNotFoundException();
    }
    return projectsPlan;
  }
}
