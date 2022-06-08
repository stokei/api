import {
  ClassroomsInstructorModel,
  IClassroomsInstructorModelData
} from '@/models/classrooms-instructor.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class ClassroomsInstructorModelMock extends ClassroomsInstructorModel {
  constructor(data?: Partial<IClassroomsInstructorModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'ClassroomsInstructor Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
