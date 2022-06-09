import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveProductCommand } from '@/commands/implements/products/remove-product.command';
import { RemoveProductDTO } from '@/dtos/products/remove-product.dto';
import { ProductModel } from '@/models/product.model';

@Injectable()
export class RemoveProductService
  implements IBaseService<RemoveProductDTO, Promise<ProductModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveProductDTO): Promise<ProductModel> {
    return await this.commandBus.execute(new RemoveProductCommand(data));
  }
}
