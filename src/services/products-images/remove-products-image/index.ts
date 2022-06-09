import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveProductsImageCommand } from '@/commands/implements/products-images/remove-products-image.command';
import { RemoveProductsImageDTO } from '@/dtos/products-images/remove-products-image.dto';
import { ProductsImageModel } from '@/models/products-image.model';

@Injectable()
export class RemoveProductsImageService
  implements IBaseService<RemoveProductsImageDTO, Promise<ProductsImageModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveProductsImageDTO): Promise<ProductsImageModel> {
    return await this.commandBus.execute(new RemoveProductsImageCommand(data));
  }
}
