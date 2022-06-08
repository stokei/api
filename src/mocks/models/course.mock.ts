import { CourseModel, ICourseModelData } from '@/models/course.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class CourseModelMock extends CourseModel {
  constructor(data?: Partial<ICourseModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Course Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
