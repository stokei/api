import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  PlanNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { PlanModel } from '@/models/plan.model';
import { FindPlanByIdRepository } from '@/repositories/plans/find-plan-by-id';
import { FindPlanByIdQuery } from '@/queries/implements/plans/find-plan-by-id.query';

@QueryHandler(FindPlanByIdQuery)
export class FindPlanByIdQueryHandler
  implements IQueryHandler<FindPlanByIdQuery>
{
  constructor(
    private readonly findPlanByIdRepository: FindPlanByIdRepository
  ) {}

  async execute(query: FindPlanByIdQuery): Promise<PlanModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const plan = await this.findPlanByIdRepository.execute(id);
    if (!plan) {
      throw new PlanNotFoundException();
    }
    return plan;
  }
}
