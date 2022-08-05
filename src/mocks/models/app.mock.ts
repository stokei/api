import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { AppStatus } from '@/enums/app-status.enum';
import { AppModel, IAppModelData } from '@/models/app.model';

export class AppModelMock extends AppModel {
  constructor(data?: Partial<IAppModelData>) {
    super({
      _id: nanoid(),
      parent: data?.parent ?? 'anyParent',
      name: data?.name ?? 'App Name',
      slug: data?.slug ?? 'app-name',
      description: data?.description ?? null,
      status: data?.status ?? AppStatus.ACTIVE,
      avatar: data?.avatar ?? null,
      plan: data?.plan ?? 'plans.sad451as1da',
      currency: data?.currency ?? 'BRL',
      logo: data?.logo ?? null,
      favicon: data?.favicon ?? null,
      active: data?.active ?? true,
      blockedAt: data?.blockedAt ?? null,
      activatedAt: data?.activatedAt ?? null,
      deactivatedAt: data?.deactivatedAt ?? null,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}