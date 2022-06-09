import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateProductsTagCommand } from '@/commands/implements/products-tags/update-products-tag.command';
import { UpdateProductsTagDTO } from '@/dtos/products-tags/update-products-tag.dto';
import { ProductsTagModel } from '@/models/products-tag.model';

@Injectable()
export class UpdateProductsTagService
  implements IBaseService<UpdateProductsTagDTO, Promise<ProductsTagModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateProductsTagDTO): Promise<ProductsTagModel> {
    return await this.commandBus.execute(new UpdateProductsTagCommand(data));
  }
}
