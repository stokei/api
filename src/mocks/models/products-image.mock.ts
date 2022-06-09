import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  IProductsImageModelData,
  ProductsImageModel
} from '@/models/products-image.model';

export class ProductsImageModelMock extends ProductsImageModel {
  constructor(data?: Partial<IProductsImageModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'ProductsImage Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
