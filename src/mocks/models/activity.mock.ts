import { ActivityModel, IActivityModelData } from '@/models/activity.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class ActivityModelMock extends ActivityModel {
  constructor(data?: Partial<IActivityModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Activity Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
