import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { IModuleModelData, ModuleModel } from '@/models/module.model';

export class ModuleModelMock extends ModuleModel {
  constructor(data?: Partial<IModuleModelData>) {
    super({
      _id: data?.id ?? nanoid(),
      name: data?.name ?? 'Module Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      app: data?.app ?? 'apps.anyApp',
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
