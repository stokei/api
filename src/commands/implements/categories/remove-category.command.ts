import { ICommand } from '@nestjs/cqrs';

import {
  RemoveCategoryDTO,
  RemoveCategoryWhereDTO
} from '@/dtos/categories/remove-category.dto';

export class RemoveCategoryCommand implements ICommand, RemoveCategoryDTO {
  where: RemoveCategoryWhereDTO;
  constructor(data: RemoveCategoryDTO) {
    this.where = data.where;
  }
}
