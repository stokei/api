import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  CoursesStudentModel,
  ICoursesStudentModelData
} from '@/models/courses-student.model';

export class CoursesStudentModelMock extends CoursesStudentModel {
  constructor(data?: Partial<ICoursesStudentModelData>) {
    super({
      _id: nanoid(),
      course: data?.course ?? 'courses.anyCourse',
      student: data?.student ?? 'students.anyStudent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
