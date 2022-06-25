import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { CourseModel, ICourseModelData } from '@/models/course.model';

export class CourseModelMock extends CourseModel {
  constructor(data?: Partial<ICourseModelData>) {
    super({
      _id: nanoid(),
      parent: data?.parent ?? 'anyParent',
      name: data?.name ?? 'Course Name',
      description: data?.description ?? null,
      avatar: data?.avatar ?? null,
      active: data?.active ?? true,
      canceledAt: data?.canceledAt ?? null,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
