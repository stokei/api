import { ICommand } from '@nestjs/cqrs';
import {
  RemoveProductsCategoryDTO,
  RemoveProductsCategoryWhereDTO
} from '@/dtos/products-categories/remove-products-category.dto';

export class RemoveProductsCategoryCommand
  implements ICommand, RemoveProductsCategoryDTO
{
  where: RemoveProductsCategoryWhereDTO;
  constructor(data: RemoveProductsCategoryDTO) {
    this.where = data.where;
  }
}
