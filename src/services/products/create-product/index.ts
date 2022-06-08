import { CreateProductCommand } from '@/commands/implements/products/create-product.command';
import { CreateProductDTO } from '@/dtos/products/create-product.dto';
import { ProductModel } from '@/models/product.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateProductService
  implements IBaseService<CreateProductDTO, Promise<ProductModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateProductDTO): Promise<ProductModel> {
    return await this.commandBus.execute(new CreateProductCommand(data));
  }
}
