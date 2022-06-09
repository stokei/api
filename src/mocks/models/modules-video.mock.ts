import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  IModulesVideoModelData,
  ModulesVideoModel
} from '@/models/modules-video.model';

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
