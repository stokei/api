import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  ActivitiesActionModel,
  IActivitiesActionModelData
} from '@/models/activities-action.model';

export class ActivitiesActionModelMock extends ActivitiesActionModel {
  constructor(data?: Partial<IActivitiesActionModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'ActivitiesAction Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
