import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { PlanStatus } from '@/enums/plan-status.enum';
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
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        AND: {
          type: PlanType.FREE,
          status: PlanStatus.ACTIVE
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
