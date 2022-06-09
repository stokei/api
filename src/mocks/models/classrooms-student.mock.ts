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
      name: data?.name ?? 'ClassroomsStudent Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
