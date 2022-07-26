import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  CourseStudentModel,
  ICourseStudentModelData
} from '@/models/course-student.model';

export class CourseStudentModelMock extends CourseStudentModel {
  constructor(data?: Partial<ICourseStudentModelData>) {
    super({
      _id: nanoid(),
      course: data?.course ?? 'courses.anyCourse',
      student: data?.student ?? 'students.anyStudent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      app: data?.app ?? 'apps.anyApp',
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
