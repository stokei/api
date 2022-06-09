import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  IProductsCategoryModelData,
  ProductsCategoryModel
} from '@/models/products-category.model';

export class ProductsCategoryModelMock extends ProductsCategoryModel {
  constructor(data?: Partial<IProductsCategoryModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'ProductsCategory Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
