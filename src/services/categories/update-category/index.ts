import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateCategoryCommand } from '@/commands/implements/categories/update-category.command';
import { UpdateCategoryDTO } from '@/dtos/categories/update-category.dto';
import { CategoryModel } from '@/models/category.model';

@Injectable()
export class UpdateCategoryService
  implements IBaseService<UpdateCategoryDTO, Promise<CategoryModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateCategoryDTO): Promise<CategoryModel> {
    return await this.commandBus.execute(new UpdateCategoryCommand(data));
  }
}
