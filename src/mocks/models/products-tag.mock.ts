import {
  ProductsTagModel,
  IProductsTagModelData
} from '@/models/products-tag.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class ProductsTagModelMock extends ProductsTagModel {
  constructor(data?: Partial<IProductsTagModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'ProductsTag Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
