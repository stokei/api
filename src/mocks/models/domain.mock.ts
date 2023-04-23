import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { DomainStatus } from '@/enums/domain-status.enum';
import { DomainModel, IDomainModelData } from '@/models/domain.model';

export class DomainModelMock extends DomainModel {
  constructor(data?: Partial<IDomainModelData>) {
    super({
      _id: data?.id ?? nanoid(),
      parent: data?.parent ?? 'anyParent',
      active: data?.active ?? true,
      name: data?.name ?? 'stokei.com',
      status: data?.status ?? DomainStatus.ACTIVE,
      activatedAt: data?.activatedAt ?? null,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      app: data?.app ?? 'apps.anyApp',
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
