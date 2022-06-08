import { CategoryModel } from '@/models/category.model';

interface IDataCategoryCreatedEvent {
  readonly category: CategoryModel;
}

export class CategoryCreatedEvent {
  readonly category: CategoryModel;

  constructor(data: IDataCategoryCreatedEvent) {
    this.category = data.category;
  }
}
