import { ICommand } from '@nestjs/cqrs';
import {
  UpdateCategoryDTO,
  UpdateCategoryDataDTO,
  UpdateCategoryWhereDTO
} from '@/dtos/categories/update-category.dto';

export class UpdateCategoryCommand implements ICommand, UpdateCategoryDTO {
  data: UpdateCategoryDataDTO;
  where: UpdateCategoryWhereDTO;
  constructor(data: UpdateCategoryDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
