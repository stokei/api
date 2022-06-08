import { ProductModel, IProductModelData } from '@/models/product.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class ProductModelMock extends ProductModel {
  constructor(data?: Partial<IProductModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Product Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
