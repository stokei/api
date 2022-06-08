import { ICommand } from '@nestjs/cqrs';
import { CreateProductsCategoryDTO } from '@/dtos/products-categories/create-products-category.dto';

export class CreateProductsCategoryCommand
  implements ICommand, CreateProductsCategoryDTO
{
  name: string;
  parent: string;

  constructor(data: CreateProductsCategoryDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
