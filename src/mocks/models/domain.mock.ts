import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { DomainStatus } from '@/enums/domain-status.enum';
import { DomainModel, IDomainModelData } from '@/models/domain.model';

export class DomainModelMock extends DomainModel {
  constructor(data?: Partial<IDomainModelData>) {
    super({
      _id: nanoid(),
      parent: data?.parent ?? 'anyParent',
      default: data?.default ?? false,
      active: data?.active ?? true,
      fulldomain: data?.fulldomain ?? 'stokei.com',
      name: data?.name ?? 'stokei',
      extension: data?.extension ?? '.com',
      language: data?.language ?? 'PT-BR',
      status: data?.status ?? DomainStatus.ACTIVE,
      activatedAt: data?.activatedAt ?? null,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
