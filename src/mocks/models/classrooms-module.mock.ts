import {
  ClassroomsModuleModel,
  IClassroomsModuleModelData
} from '@/models/classrooms-module.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class ClassroomsModuleModelMock extends ClassroomsModuleModel {
  constructor(data?: Partial<IClassroomsModuleModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'ClassroomsModule Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
