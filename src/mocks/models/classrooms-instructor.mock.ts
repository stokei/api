import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  ClassroomsInstructorModel,
  IClassroomsInstructorModelData
} from '@/models/classrooms-instructor.model';

export class ClassroomsInstructorModelMock extends ClassroomsInstructorModel {
  constructor(data?: Partial<IClassroomsInstructorModelData>) {
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
