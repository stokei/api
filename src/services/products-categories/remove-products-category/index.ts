import { RemoveProductsCategoryCommand } from '@/commands/implements/products-categories/remove-products-category.command';
import { RemoveProductsCategoryDTO } from '@/dtos/products-categories/remove-products-category.dto';
import { ProductsCategoryModel } from '@/models/products-category.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveProductsCategoryService
  implements
    IBaseService<RemoveProductsCategoryDTO, Promise<ProductsCategoryModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: RemoveProductsCategoryDTO
  ): Promise<ProductsCategoryModel> {
    return await this.commandBus.execute(
      new RemoveProductsCategoryCommand(data)
    );
  }
}
