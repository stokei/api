import { Injectable } from '@nestjs/common';
import { IBaseService, splitServiceId } from '@stokei/nestjs';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { CoursesLoader } from '@/controllers/graphql/dataloaders/courses.loader';
import { MaterialsLoader } from '@/controllers/graphql/dataloaders/materials.loader';
import { PlansLoader } from '@/controllers/graphql/dataloaders/plans.loader';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { AppModel } from '@/models/app.model';
import { CourseModel } from '@/models/course.model';
import { MaterialModel } from '@/models/material.model';
import { PlanModel } from '@/models/plan.model';

export type ProductParent = AppModel | PlanModel | CourseModel | MaterialModel;

@Injectable()
export class FindProductParentByParentService
  implements IBaseService<string, Promise<ProductParent>>
{
  constructor(
    private readonly appsLoader: AppsLoader,
    private readonly coursesLoader: CoursesLoader,
    private readonly materialsLoader: MaterialsLoader,
    private readonly plansLoader: PlansLoader
  ) {}

  async execute(parent: string): Promise<ProductParent> {
    const getItem = () => {
      const handlers = {
        [ServerStokeiApiIdPrefix.APPS]: () =>
          this.appsLoader.findByIds.load(parent),
        [ServerStokeiApiIdPrefix.COURSES]: () =>
          this.coursesLoader.findByIds.load(parent),
        [ServerStokeiApiIdPrefix.MATERIALS]: () =>
          this.materialsLoader.findByIds.load(parent),
        [ServerStokeiApiIdPrefix.PLANS]: () =>
          this.plansLoader.findByIds.load(parent)
      };
      const serviceName = splitServiceId(parent)?.service;
      return handlers?.[serviceName];
    };
    const getItemHandler = await getItem();
    const parentModel = parent && (await getItemHandler?.());
    return parentModel;
  }
}
