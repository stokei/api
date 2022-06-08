import { CategoryModel, ICategoryModelData } from '@/models/category.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class CategoryModelMock extends CategoryModel {
  constructor(data?: Partial<ICategoryModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Category Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
