import { FileModel, IFileModelData } from '@/models/file.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class FileModelMock extends FileModel {
  constructor(data?: Partial<IFileModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'File Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
