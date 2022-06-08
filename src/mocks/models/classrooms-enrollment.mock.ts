import {
  ClassroomsEnrollmentModel,
  IClassroomsEnrollmentModelData
} from '@/models/classrooms-enrollment.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class ClassroomsEnrollmentModelMock extends ClassroomsEnrollmentModel {
  constructor(data?: Partial<IClassroomsEnrollmentModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'ClassroomsEnrollment Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
