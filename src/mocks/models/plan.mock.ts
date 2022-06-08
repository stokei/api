import { PlanModel, IPlanModelData } from '@/models/plan.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class PlanModelMock extends PlanModel {
  constructor(data?: Partial<IPlanModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Plan Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
