import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { IProductModelData, ProductModel } from '@/models/product.model';

export class ProductModelMock extends ProductModel {
  constructor(data?: Partial<IProductModelData>) {
    super({
      _id: data?.id ?? nanoid(),
      parent: data?.parent ?? 'anyParent',
      name: data?.name ?? 'Product Name',
      description: data?.description ?? null,
      app: data?.app ?? 'apps.dsaudhuashd454',
      stripeProduct: data?.stripeProduct ?? 'anyExternalProductId',
      avatar: data?.avatar ?? null,
      active: data?.active ?? true,
      activatedAt: data?.activatedAt ?? null,
      deactivatedAt: data?.deactivatedAt ?? null,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
