import { RemoveProductsTagCommand } from '@/commands/implements/products-tags/remove-products-tag.command';
import { RemoveProductsTagDTO } from '@/dtos/products-tags/remove-products-tag.dto';
import { ProductsTagModel } from '@/models/products-tag.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveProductsTagService
  implements IBaseService<RemoveProductsTagDTO, Promise<ProductsTagModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveProductsTagDTO): Promise<ProductsTagModel> {
    return await this.commandBus.execute(new RemoveProductsTagCommand(data));
  }
}
