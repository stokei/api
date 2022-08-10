import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { PlanType } from '@/enums/plan-type.enum';
import { PlanNotFoundException } from '@/errors';
import { PlanModel } from '@/models/plan.model';
import { FindDefaultPlanQuery } from '@/queries/implements/plans/find-default-plan.query';
import { FindAllPlansRepository } from '@/repositories/plans/find-all-plans';

@QueryHandler(FindDefaultPlanQuery)
export class FindDefaultPlanQueryHandler
  implements IQueryHandler<FindDefaultPlanQuery>
{
  constructor(
    private readonly findAllPlansRepository: FindAllPlansRepository
  ) {}

  async execute(): Promise<PlanModel> {
    const plans = await this.findAllPlansRepository.execute({
      page: {
        limit: 1
      },
      where: {
        AND: {
          type: PlanType.FREE
        }
      }
    });
    const plan = plans?.length > 0 && plans[0];
    if (!plan) {
      throw new PlanNotFoundException();
    }
    return plan;
  }
}
