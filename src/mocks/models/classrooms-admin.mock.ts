import {
  ClassroomsAdminModel,
  IClassroomsAdminModelData
} from '@/models/classrooms-admin.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class ClassroomsAdminModelMock extends ClassroomsAdminModel {
  constructor(data?: Partial<IClassroomsAdminModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'ClassroomsAdmin Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
