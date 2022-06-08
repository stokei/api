import {
  ClassroomsMaterialModel,
  IClassroomsMaterialModelData
} from '@/models/classrooms-material.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class ClassroomsMaterialModelMock extends ClassroomsMaterialModel {
  constructor(data?: Partial<IClassroomsMaterialModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'ClassroomsMaterial Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
