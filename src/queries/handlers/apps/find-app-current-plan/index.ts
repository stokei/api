import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue } from '@stokei/nestjs';
import { v4 as uuid } from 'uuid';

import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PlanNotFoundException
} from '@/errors';
import { PlanModel } from '@/models/plan.model';
import { FindAppCurrentPlanQuery } from '@/queries/implements/apps/find-app-current-plan.query';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindAllPlansService } from '@/services/plans/find-all-plans';

@QueryHandler(FindAppCurrentPlanQuery)
export class FindAppCurrentPlanQueryHandler
  implements IQueryHandler<FindAppCurrentPlanQuery>
{
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findAllPlansService: FindAllPlansService
  ) {}

  async execute(query: FindAppCurrentPlanQuery): Promise<PlanModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const appId = cleanValue(query.appId);
    if (!appId) {
      throw new ParamNotFoundException('appId');
    }
    const app = await this.findAppByIdService.execute(appId);
    if (!app) {
      throw new AppNotFoundException();
    }
    const plans = await this.findAllPlansService.execute({
      where: {
        AND: {
          app: {
            equals: app.id
          },
          active: {
            equals: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      page: {
        limit: 1
      }
    });
    const defaultPlan = new PlanModel({
      id: uuid(),
      app: app.id,
      active: true,
      applicationFeePercentage: 1000,
      canceledAt: null,
      hasCustomDomain: false,
      hasCustomSite: false,
      quantityCourses: 1,
      quantityClassroomsPerCourses: 1,
      quantityInstructorPerCourses: 1,
      quantityModulesPerClassrooms: 1,
      quantityVideosPerModules: 1
    });
    let plan = defaultPlan;
    if (plans?.items?.length > 0) {
      plan = plans?.items[0];
    }
    if (!plan) {
      throw new PlanNotFoundException();
    }
    return plan;
  }
}
