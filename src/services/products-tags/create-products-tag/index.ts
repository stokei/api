import { CreateProductsTagCommand } from '@/commands/implements/products-tags/create-products-tag.command';
import { CreateProductsTagDTO } from '@/dtos/products-tags/create-products-tag.dto';
import { ProductsTagModel } from '@/models/products-tag.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateProductsTagService
  implements IBaseService<CreateProductsTagDTO, Promise<ProductsTagModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateProductsTagDTO): Promise<ProductsTagModel> {
    return await this.commandBus.execute(new CreateProductsTagCommand(data));
  }
}
