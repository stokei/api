import { ModuleModel, IModuleModelData } from '@/models/module.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class ModuleModelMock extends ModuleModel {
  constructor(data?: Partial<IModuleModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Module Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
