import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  IProjectsMemberModelData,
  ProjectsMemberModel
} from '@/models/projects-member.model';

export class ProjectsMemberModelMock extends ProjectsMemberModel {
  constructor(data?: Partial<IProjectsMemberModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'ProjectsMember Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
