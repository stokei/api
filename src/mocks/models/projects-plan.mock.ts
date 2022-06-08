import {
  ProjectsPlanModel,
  IProjectsPlanModelData
} from '@/models/projects-plan.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class ProjectsPlanModelMock extends ProjectsPlanModel {
  constructor(data?: Partial<IProjectsPlanModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'ProjectsPlan Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
