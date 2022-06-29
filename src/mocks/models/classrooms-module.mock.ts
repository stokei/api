import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  ClassroomsModuleModel,
  IClassroomsModuleModelData
} from '@/models/classrooms-module.model';

export class ClassroomsModuleModelMock extends ClassroomsModuleModel {
  constructor(data?: Partial<IClassroomsModuleModelData>) {
    super({
      _id: nanoid(),
      classroom: data?.classroom ?? 'classrooms.anyClassroom',
      module: data?.module ?? 'modules.anyModule',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
