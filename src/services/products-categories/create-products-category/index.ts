import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateProductsCategoryCommand } from '@/commands/implements/products-categories/create-products-category.command';
import { CreateProductsCategoryDTO } from '@/dtos/products-categories/create-products-category.dto';
import { ProductsCategoryModel } from '@/models/products-category.model';

@Injectable()
export class CreateProductsCategoryService
  implements
    IBaseService<CreateProductsCategoryDTO, Promise<ProductsCategoryModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CreateProductsCategoryDTO
  ): Promise<ProductsCategoryModel> {
    return await this.commandBus.execute(
      new CreateProductsCategoryCommand(data)
    );
  }
}
