import { ICommand } from '@nestjs/cqrs';

import { CreateCategoryDTO } from '@/dtos/categories/create-category.dto';

export class CreateCategoryCommand implements ICommand, CreateCategoryDTO {
  name: string;
  parent: string;

  constructor(data: CreateCategoryDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
