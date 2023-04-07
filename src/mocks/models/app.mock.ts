import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { AppStatus } from '@/enums/app-status.enum';
import { AppModel, IAppModelData } from '@/models/app.model';

export class AppModelMock extends AppModel {
  constructor(data?: Partial<IAppModelData>) {
    super({
      _id: data?.id ?? nanoid(),
      parent: data?.parent ?? 'anyParent',
      name: data?.name ?? 'App Name',
      slug: data?.slug ?? 'app-name',
      email: data?.email ?? 'app@email.com',
      description: data?.description ?? null,
      status: data?.status ?? AppStatus.ACTIVE,
      avatar: data?.avatar ?? null,
      paymentMethod: data?.paymentMethod ?? 'pay_method_shaudhsaudhas',
      stripeBankAccount: data?.stripeBankAccount ?? 'bank_shaudhsaudhas',
      stripeAccount: data?.stripeAccount ?? 'acc_shaudhsaudhas',
      currency: data?.currency ?? 'BRL',
      logo: data?.logo ?? null,
      icon: data?.icon ?? null,
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
