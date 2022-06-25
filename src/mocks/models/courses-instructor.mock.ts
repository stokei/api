import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  CoursesInstructorModel,
  ICoursesInstructorModelData
} from '@/models/courses-instructor.model';

export class CoursesInstructorModelMock extends CoursesInstructorModel {
  constructor(data?: Partial<ICoursesInstructorModelData>) {
    super({
      _id: nanoid(),
      course: data?.course ?? 'courses.anyCourse',
      instructor: data?.instructor ?? 'instructors.anyInstructor',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
