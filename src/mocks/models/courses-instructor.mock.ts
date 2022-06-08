import {
  CoursesInstructorModel,
  ICoursesInstructorModelData
} from '@/models/courses-instructor.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class CoursesInstructorModelMock extends CoursesInstructorModel {
  constructor(data?: Partial<ICoursesInstructorModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'CoursesInstructor Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
