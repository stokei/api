import { ClassroomModel, IClassroomModelData } from '@/models/classroom.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class ClassroomModelMock extends ClassroomModel {
  constructor(data?: Partial<IClassroomModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Classroom Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
