import { ICommand } from '@nestjs/cqrs';
import {
  UpdateProductsCategoryDTO,
  UpdateProductsCategoryDataDTO,
  UpdateProductsCategoryWhereDTO
} from '@/dtos/products-categories/update-products-category.dto';

export class UpdateProductsCategoryCommand
  implements ICommand, UpdateProductsCategoryDTO
{
  data: UpdateProductsCategoryDataDTO;
  where: UpdateProductsCategoryWhereDTO;
  constructor(data: UpdateProductsCategoryDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
