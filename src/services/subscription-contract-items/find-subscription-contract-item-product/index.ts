import { Injectable } from '@nestjs/common';
import { IBaseService, splitServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { CourseModel } from '@/models/course.model';
import { MaterialModel } from '@/models/material.model';
import { PlanModel } from '@/models/plan.model';
import { ProductModel } from '@/models/product.model';
import { FindCourseByIdService } from '@/services/courses/find-course-by-id';
import { FindMaterialByIdService } from '@/services/materials/find-material-by-id';
import { FindPlanByIdService } from '@/services/plans/find-plan-by-id';
import { FindProductByIdService } from '@/services/products/find-product-by-id';

export type SubscriptionContractItemProduct =
  | ProductModel
  | PlanModel
  | CourseModel
  | MaterialModel;

@Injectable()
export class FindSubscriptionContractItemProductService
  implements IBaseService<string, Promise<SubscriptionContractItemProduct>>
{
  constructor(
    private readonly findCourseByIdService: FindCourseByIdService,
    private readonly findProductByIdService: FindProductByIdService,
    private readonly findMaterialByIdService: FindMaterialByIdService,
    private readonly findPlanByIdService: FindPlanByIdService
  ) {}

  async execute(product: string): Promise<SubscriptionContractItemProduct> {
    const getItem = () => {
      const handlers = {
        [ServerStokeiApiIdPrefix.COURSES]: () =>
          this.findCourseByIdService.execute(product),
        [ServerStokeiApiIdPrefix.PRODUCTS]: () =>
          this.findProductByIdService.execute(product),
        [ServerStokeiApiIdPrefix.MATERIALS]: () =>
          this.findMaterialByIdService.execute(product),
        [ServerStokeiApiIdPrefix.PLANS]: () =>
          this.findPlanByIdService.execute(product)
      };
      const serviceName = splitServiceId(product)
        ?.service as ServerStokeiApiIdPrefix;
      const handler: () => Promise<SubscriptionContractItemProduct> =
        handlers?.[serviceName];
      return handler;
    };
    const getItemHandler = await getItem();
    return getItemHandler?.();
  }
}
