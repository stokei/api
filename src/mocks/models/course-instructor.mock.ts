import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  CourseInstructorModel,
  ICourseInstructorModelData
} from '@/models/course-instructor.model';

export class CourseInstructorModelMock extends CourseInstructorModel {
  constructor(data?: Partial<ICourseInstructorModelData>) {
    super({
      _id: nanoid(),
      course: data?.course ?? 'courses.anyCourse',
      instructor: data?.instructor ?? 'instructors.anyInstructor',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      app: data?.app ?? 'apps.anyApp',
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
