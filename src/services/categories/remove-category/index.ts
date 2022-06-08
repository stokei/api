import { RemoveCategoryCommand } from '@/commands/implements/categories/remove-category.command';
import { RemoveCategoryDTO } from '@/dtos/categories/remove-category.dto';
import { CategoryModel } from '@/models/category.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveCategoryService
  implements IBaseService<RemoveCategoryDTO, Promise<CategoryModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveCategoryDTO): Promise<CategoryModel> {
    return await this.commandBus.execute(new RemoveCategoryCommand(data));
  }
}
