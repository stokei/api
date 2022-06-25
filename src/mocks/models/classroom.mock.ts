import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { ClassroomModel, IClassroomModelData } from '@/models/classroom.model';

export class ClassroomModelMock extends ClassroomModel {
  constructor(data?: Partial<IClassroomModelData>) {
    super({
      _id: nanoid(),
      parent: data?.parent ?? 'anyParent',
      name: data?.name ?? 'Classroom Name',
      description: data?.description ?? 'Classroom Name',
      hasAccessToAllModules: data?.hasAccessToAllModules ?? true,
      active: data?.active ?? true,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
