import { VersionModel, IVersionModelData } from '@/models/version.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class VersionModelMock extends VersionModel {
  constructor(data?: Partial<IVersionModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Version Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
