import { CategoryModel } from '@/models/category.model';

interface IDataCategoryUpdatedEvent {
  readonly category: CategoryModel;
}

export class CategoryUpdatedEvent {
  readonly category: CategoryModel;

  constructor(data: IDataCategoryUpdatedEvent) {
    this.category = data.category;
  }
}
