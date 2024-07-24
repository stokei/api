import { Injectable } from '@nestjs/common';
import { IBaseService, splitServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { AppModel } from '@/models/app.model';
import { CourseModel } from '@/models/course.model';
import { MaterialModel } from '@/models/material.model';
import { PlanModel } from '@/models/plan.model';
import { ProductModel } from '@/models/product.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindCourseByIdService } from '@/services/courses/find-course-by-id';
import { FindMaterialByIdService } from '@/services/materials/find-material-by-id';
import { FindPlanByIdService } from '@/services/plans/find-plan-by-id';
import { FindProductByIdService } from '@/services/products/find-product-by-id';

export type ProductExternalReference =
  | AppModel
  | PlanModel
  | ProductModel
  | CourseModel
  | MaterialModel;

@Injectable()
export class FindProductExternalReferenceByExternalReferenceService
  implements IBaseService<string, Promise<ProductExternalReference>>
{
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findProductByIdService: FindProductByIdService,
    private readonly findCourseByIdService: FindCourseByIdService,
    private readonly findMaterialByIdService: FindMaterialByIdService,
    private readonly findPlanByIdService: FindPlanByIdService
  ) {}

  async execute(externalReference: string): Promise<ProductExternalReference> {
    const getItem = () => {
      const handlers = {
        [ServerStokeiApiIdPrefix.APPS]: () =>
          this.findAppByIdService.execute(externalReference),
        [ServerStokeiApiIdPrefix.PRODUCTS]: () =>
          this.findProductByIdService.execute(externalReference),
        [ServerStokeiApiIdPrefix.COURSES]: () =>
          this.findCourseByIdService.execute(externalReference),
        [ServerStokeiApiIdPrefix.MATERIALS]: () =>
          this.findMaterialByIdService.execute(externalReference),
        [ServerStokeiApiIdPrefix.PLANS]: () =>
          this.findPlanByIdService.execute(externalReference)
      };
      const serviceName = splitServiceId(externalReference)?.service;
      return handlers?.[serviceName];
    };
    const getItemHandler = await getItem();
    const externalReferenceModel =
      externalReference && (await getItemHandler?.());
    return externalReferenceModel;
  }
}
