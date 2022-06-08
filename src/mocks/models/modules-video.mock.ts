import {
  ModulesVideoModel,
  IModulesVideoModelData
} from '@/models/modules-video.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class ModulesVideoModelMock extends ModulesVideoModel {
  constructor(data?: Partial<IModulesVideoModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'ModulesVideo Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
