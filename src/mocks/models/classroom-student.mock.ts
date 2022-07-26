import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  ClassroomStudentModel,
  IClassroomStudentModelData
} from '@/models/classroom-student.model';

export class ClassroomStudentModelMock extends ClassroomStudentModel {
  constructor(data?: Partial<IClassroomStudentModelData>) {
    super({
      _id: nanoid(),
      classroom: data?.classroom ?? 'classrooms.anyClassroom',
      student: data?.student ?? 'accounts.anyStudent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      app: data?.app ?? 'apps.anyApp',
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
