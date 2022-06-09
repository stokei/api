import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  CoursesAdminModel,
  ICoursesAdminModelData
} from '@/models/courses-admin.model';

export class CoursesAdminModelMock extends CoursesAdminModel {
  constructor(data?: Partial<ICoursesAdminModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'CoursesAdmin Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
