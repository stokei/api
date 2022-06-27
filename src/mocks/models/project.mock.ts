import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { ProjectStatus } from '@/enums/project-status.enum';
import { IProjectModelData, ProjectModel } from '@/models/project.model';

export class ProjectModelMock extends ProjectModel {
  constructor(data?: Partial<IProjectModelData>) {
    super({
      _id: nanoid(),
      parent: data?.parent ?? 'anyParent',
      name: data?.name ?? 'Project Name',
      slug: data?.slug ?? 'project-name',
      description: data?.description ?? null,
      status: data?.status ?? ProjectStatus.ACTIVE,
      avatar: data?.avatar ?? null,
      plan: data?.plan ?? 'plans.sad451as1da',
      currency: data?.currency ?? 'BRL',
      active: data?.active ?? true,
      blockedAt: data?.blockedAt ?? null,
      activatedAt: data?.activatedAt ?? null,
      deactivatedAt: data?.deactivatedAt ?? null,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
