import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { ClassroomModel, IClassroomModelData } from '@/models/classroom.model';

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
