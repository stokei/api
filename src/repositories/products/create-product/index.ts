import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateProductDTO } from '@/dtos/products/create-product.dto';
import { ProductMapper } from '@/mappers/products';
import { ProductModel } from '@/models/product.model';

@Injectable()
export class CreateProductRepository
  implements IBaseRepository<CreateProductDTO, Promise<ProductModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateProductDTO): Promise<ProductModel> {
    return new ProductMapper().toModel(
      await this.model.product.create({ data })
    );
  }
}
