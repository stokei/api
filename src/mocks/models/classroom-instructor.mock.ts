import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  ClassroomInstructorModel,
  IClassroomInstructorModelData
} from '@/models/classroom-instructor.model';

export class ClassroomInstructorModelMock extends ClassroomInstructorModel {
  constructor(data?: Partial<IClassroomInstructorModelData>) {
    super({
      _id: nanoid(),
      classroom: data?.classroom ?? 'classrooms.anyClassroom',
      instructor: data?.instructor ?? 'accounts.anyInstructor',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
