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
      name: data?.name ?? 'CoursesStudent Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
