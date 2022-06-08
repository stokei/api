import {
  ModulesMaterialModel,
  IModulesMaterialModelData
} from '@/models/modules-material.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class ModulesMaterialModelMock extends ModulesMaterialModel {
  constructor(data?: Partial<IModulesMaterialModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'ModulesMaterial Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
