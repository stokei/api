import { CategoryModel } from '@/models/category.model';

interface IDataCategoryRemovedEvent {
  readonly category: CategoryModel;
}

export class CategoryRemovedEvent {
  readonly category: CategoryModel;

  constructor(data: IDataCategoryRemovedEvent) {
    this.category = data.category;
  }
}
