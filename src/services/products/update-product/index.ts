import { UpdateProductCommand } from '@/commands/implements/products/update-product.command';
import { UpdateProductDTO } from '@/dtos/products/update-product.dto';
import { ProductModel } from '@/models/product.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdateProductService
  implements IBaseService<UpdateProductDTO, Promise<ProductModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateProductDTO): Promise<ProductModel> {
    return await this.commandBus.execute(new UpdateProductCommand(data));
  }
}
