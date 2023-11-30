import { Injectable } from '@nestjs/common';
import { IBaseService, splitServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { AppModel } from '@/models/app.model';
import { CourseModel } from '@/models/course.model';
import { MaterialModel } from '@/models/material.model';
import { PlanModel } from '@/models/plan.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindCourseByIdService } from '@/services/courses/find-course-by-id';
import { FindMaterialByIdService } from '@/services/materials/find-material-by-id';
import { FindPlanByIdService } from '@/services/plans/find-plan-by-id';

export type ProductParent = AppModel | PlanModel | CourseModel | MaterialModel;

@Injectable()
export class FindProductParentByParentService
  implements IBaseService<string, Promise<ProductParent>>
{
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findCourseByIdService: FindCourseByIdService,
    private readonly findMaterialByIdService: FindMaterialByIdService,
    private readonly findPlanByIdService: FindPlanByIdService
  ) {}

  async execute(parent: string): Promise<ProductParent> {
    const getItem = () => {
      const handlers = {
        [ServerStokeiApiIdPrefix.APPS]: () =>
          this.findAppByIdService.execute(parent),
        [ServerStokeiApiIdPrefix.COURSES]: () =>
          this.findCourseByIdService.execute(parent),
        [ServerStokeiApiIdPrefix.MATERIALS]: () =>
          this.findMaterialByIdService.execute(parent),
        [ServerStokeiApiIdPrefix.PLANS]: () =>
          this.findPlanByIdService.execute(parent)
      };
      const serviceName = splitServiceId(parent)?.service;
      return handlers?.[serviceName];
    };
    const getItemHandler = await getItem();
    const parentModel = parent && (await getItemHandler?.());
    return parentModel;
  }
}
