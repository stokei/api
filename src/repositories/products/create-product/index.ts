import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateProductRepositoryDTO } from '@/dtos/products/create-product-repository.dto';
import { ProductMapper } from '@/mappers/products';
import { ProductModel } from '@/models/product.model';

@Injectable()
export class CreateProductRepository
  implements IBaseRepository<CreateProductRepositoryDTO, Promise<ProductModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateProductRepositoryDTO): Promise<ProductModel> {
    return new ProductMapper().toModel(
      await this.model.product.create({ data })
    );
  }
}
