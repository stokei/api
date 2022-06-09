import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateProductsImageCommand } from '@/commands/implements/products-images/create-products-image.command';
import { CreateProductsImageDTO } from '@/dtos/products-images/create-products-image.dto';
import { ProductsImageModel } from '@/models/products-image.model';

@Injectable()
export class CreateProductsImageService
  implements IBaseService<CreateProductsImageDTO, Promise<ProductsImageModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateProductsImageDTO): Promise<ProductsImageModel> {
    return await this.commandBus.execute(new CreateProductsImageCommand(data));
  }
}
