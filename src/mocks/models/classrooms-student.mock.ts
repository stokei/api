import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  ClassroomsStudentModel,
  IClassroomsStudentModelData
} from '@/models/classrooms-student.model';

export class ClassroomsStudentModelMock extends ClassroomsStudentModel {
  constructor(data?: Partial<IClassroomsStudentModelData>) {
    super({
      _id: nanoid(),
      classroom: data?.classroom ?? 'classrooms.anyClassroom',
      student: data?.student ?? 'accounts.anyStudent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
