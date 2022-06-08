import { UpdateProductsCategoryCommand } from '@/commands/implements/products-categories/update-products-category.command';
import { UpdateProductsCategoryDTO } from '@/dtos/products-categories/update-products-category.dto';
import { ProductsCategoryModel } from '@/models/products-category.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdateProductsCategoryService
  implements
    IBaseService<UpdateProductsCategoryDTO, Promise<ProductsCategoryModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: UpdateProductsCategoryDTO
  ): Promise<ProductsCategoryModel> {
    return await this.commandBus.execute(
      new UpdateProductsCategoryCommand(data)
    );
  }
}
