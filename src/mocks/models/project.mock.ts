import { ProjectModel, IProjectModelData } from '@/models/project.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class ProjectModelMock extends ProjectModel {
  constructor(data?: Partial<IProjectModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Project Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
