import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateProductsImageCommand } from '@/commands/implements/products-images/update-products-image.command';
import { UpdateProductsImageDTO } from '@/dtos/products-images/update-products-image.dto';
import { ProductsImageModel } from '@/models/products-image.model';

@Injectable()
export class UpdateProductsImageService
  implements IBaseService<UpdateProductsImageDTO, Promise<ProductsImageModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateProductsImageDTO): Promise<ProductsImageModel> {
    return await this.commandBus.execute(new UpdateProductsImageCommand(data));
  }
}
