import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { ClassroomsEnrollmentStatus } from '@/enums/classrooms-enrollment-status.enum';
import {
  ClassroomsEnrollmentModel,
  IClassroomsEnrollmentModelData
} from '@/models/classrooms-enrollment.model';

export class ClassroomsEnrollmentModelMock extends ClassroomsEnrollmentModel {
  constructor(data?: Partial<IClassroomsEnrollmentModelData>) {
    super({
      _id: nanoid(),
      classroom: data?.classroom ?? 'classrooms.ss4d84asdsa5d1as5',
      student: data?.student ?? 'students.5a1sd5as1das',
      status: data?.status ?? ClassroomsEnrollmentStatus.ACTIVE,
      active: data?.active ?? true,
      startAt: data?.startAt ?? convertToISODateString(Date.now()),
      endAt: data?.endAt ?? convertToISODateString(Date.now() + 60000),
      canceledAt: data?.canceledAt ?? null,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
