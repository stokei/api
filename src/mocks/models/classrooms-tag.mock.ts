import {
  ClassroomsTagModel,
  IClassroomsTagModelData
} from '@/models/classrooms-tag.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class ClassroomsTagModelMock extends ClassroomsTagModel {
  constructor(data?: Partial<IClassroomsTagModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'ClassroomsTag Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
