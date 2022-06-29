import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { IProductModelData, ProductModel } from '@/models/product.model';

export class ProductModelMock extends ProductModel {
  constructor(data?: Partial<IProductModelData>) {
    super({
      _id: nanoid(),
      parent: data?.parent ?? 'anyParent',
      name: data?.name ?? 'Product Name',
      description: data?.description ?? null,
      project: data?.project ?? 'projects.dsaudhuashd454',
      externalProductId: data?.externalProductId ?? 'anyExternalProductId',
      checkoutVisible: data?.checkoutVisible ?? true,
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
