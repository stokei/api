import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { PlanStatus } from '@/enums/plan-status.enum';
import { PlanType } from '@/enums/plan-type.enum';
import { IPlanModelData, PlanModel } from '@/models/plan.model';

export class PlanModelMock extends PlanModel {
  constructor(data?: Partial<IPlanModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Plan Name',
      type: data?.type ?? PlanType.BASIC,
      checkoutVisible: data?.checkoutVisible ?? true,
      allowedToSell: data?.allowedToSell ?? true,
      status: data?.status ?? PlanStatus.ACTIVE,
      hasCustomDomain: data?.hasCustomDomain ?? true,
      hasCustomSite: data?.hasCustomSite ?? true,
      quantityCourses: data?.quantityCourses ?? 1,
      quantityInstructorPerCourses: data?.quantityInstructorPerCourses ?? 1,
      quantityClassroomsPerCourses: data?.quantityClassroomsPerCourses ?? 2,
      quantityModulesPerClassrooms: data?.quantityModulesPerClassrooms ?? 10,
      quantityVideosPerModules: data?.quantityVideosPerModules ?? 3,
      applicationFeePercentage: data?.applicationFeePercentage ?? 1000,
      active: data?.active ?? true,
      canceledAt: data?.canceledAt ?? null,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
