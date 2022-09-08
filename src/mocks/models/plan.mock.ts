import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { IPlanModelData, PlanModel } from '@/models/plan.model';

export class PlanModelMock extends PlanModel {
  constructor(data?: Partial<IPlanModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Plan',
      price: data?.price ?? 'prices.stokei',
      product: data?.product ?? 'products.stokei',
      hasCustomDomain: data?.hasCustomDomain ?? true,
      hasCustomSite: data?.hasCustomSite ?? true,
      quantityCourses: data?.quantityCourses ?? 1,
      quantityInstructorPerCourses: data?.quantityInstructorPerCourses ?? 1,
      quantityClassroomsPerCourses: data?.quantityClassroomsPerCourses ?? 2,
      quantityModulesPerClassrooms: data?.quantityModulesPerClassrooms ?? 10,
      quantityVideosPerModules: data?.quantityVideosPerModules ?? 3,
      applicationFeePercentage: data?.applicationFeePercentage ?? 10,
      active: data?.active ?? true,
      canceledAt: data?.canceledAt ?? null,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
