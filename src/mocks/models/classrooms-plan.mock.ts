import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  ClassroomsPlanModel,
  IClassroomsPlanModelData
} from '@/models/classrooms-plan.model';

export class ClassroomsPlanModelMock extends ClassroomsPlanModel {
  constructor(data?: Partial<IClassroomsPlanModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'ClassroomsPlan Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
