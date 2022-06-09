import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateCategoryCommand } from '@/commands/implements/categories/create-category.command';
import { CreateCategoryDTO } from '@/dtos/categories/create-category.dto';
import { CategoryModel } from '@/models/category.model';

@Injectable()
export class CreateCategoryService
  implements IBaseService<CreateCategoryDTO, Promise<CategoryModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateCategoryDTO): Promise<CategoryModel> {
    return await this.commandBus.execute(new CreateCategoryCommand(data));
  }
}
